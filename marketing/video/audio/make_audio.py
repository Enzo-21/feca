"""Música de fondo + efectos para el video vertical de FECA (40 s, 30 fps).

Todo se sintetiza acá: pad ambiental, arpegio pluck, kick suave y efectos
(teclas, whooshes, pops, chimes) sincronizados a los frames de las
escenas. Las escenas y sus duraciones salen de src/timeline.json (las mismas que
lee el video). 120 BPM: un tiempo = 15 frames, así que todos los cortes caen en el pulso.
"""
import json
import math
import os
import sys

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, fftconvolve, sosfilt

SR = 48000
FPS = 30
HERE = os.path.dirname(os.path.abspath(__file__))
TIMELINE = json.load(open(os.path.join(HERE, '..', 'src', 'timeline.json')))
SCENES = {}
SCENE_DUR = {}
_f = 0
for _name, _dur in TIMELINE['scenes']:
    SCENES[_name] = _f
    SCENE_DUR[_name] = _dur
    _f += _dur
TOTAL_FRAMES = _f
DUR = TOTAL_FRAMES / FPS
N = int(SR * DUR)
BPM = 120
BEAT = 60 / BPM
rng = np.random.default_rng(7)


def t_of(frame):
    return frame / FPS


def T(scene):
    return t_of(SCENES[scene])


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env_adsr(n, a, d, s, r, sr=SR):
    a_n, d_n, r_n = int(a * sr), int(d * sr), int(r * sr)
    s_n = max(0, n - a_n - d_n - r_n)
    e = np.concatenate([
        np.linspace(0, 1, a_n, endpoint=False),
        np.linspace(1, s, d_n, endpoint=False),
        np.full(s_n, s),
        np.linspace(s, 0, r_n),
    ])
    return e[:n] if len(e) >= n else np.pad(e, (0, n - len(e)))


def lp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'low', fs=SR, output='sos'), x)


def hp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'high', fs=SR, output='sos'), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], 'band', fs=SR, output='sos'), x)


def reverb_ir(seconds=2.2, decay=3.2):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = rng.standard_normal((n, 2)) * np.exp(-decay * t)[:, None]
    ir = np.stack([lp(ir[:, 0], 6000), lp(ir[:, 1], 6000)], axis=1)
    ir[: int(0.012 * SR)] = 0  # pre-delay
    return ir / np.abs(ir).sum(axis=0).max() * 6


IR = reverb_ir()


def reverb(st, wet):
    out = np.stack([fftconvolve(st[:, c], IR[:, c])[: len(st)] for c in range(2)], axis=1)
    return st + out * wet


def place(bus, sig, t, gain=1.0, pan=0.0):
    """Suma una señal mono (o estéreo) al bus en el segundo t."""
    i = int(t * SR)
    if i >= len(bus):
        return
    if sig.ndim == 1:
        l = math.cos((pan + 1) * math.pi / 4)
        r = math.sin((pan + 1) * math.pi / 4)
        sig = np.stack([sig * l, sig * r], axis=1)
    n = min(len(sig), len(bus) - i)
    bus[i:i + n] += sig[:n] * gain


# ───────────────────────── efectos ─────────────────────────

def sfx_click():
    n = int(0.05 * SR)
    t = np.arange(n) / SR
    noise = hp(rng.standard_normal(n), 2500) * np.exp(-t * 900)
    body = np.sin(2 * np.pi * 1800 * t) * np.exp(-t * 260) * 0.5
    low = np.sin(2 * np.pi * 220 * t) * np.exp(-t * 120) * 0.35
    return (noise * 0.6 + body + low) * 0.9


def sfx_key():
    n = int(0.035 * SR)
    t = np.arange(n) / SR
    f = rng.uniform(2600, 3600)
    noise = bp(rng.standard_normal(n), 1500, 7000) * np.exp(-t * 1100)
    tick = np.sin(2 * np.pi * f * t) * np.exp(-t * 700) * 0.4
    return (noise * 0.5 + tick) * rng.uniform(0.75, 1.0)


def sfx_pop(f0=820, f1=480, dur=0.09):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t * 60)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 45) * env_adsr(n, 0.002, 0, 1, 0.01)


def sfx_whoosh(dur=0.55, lo=300, hi=5000):
    n = int(dur * SR)
    t = np.linspace(0, 1, n)
    noise = rng.standard_normal(n)
    # barrido de un filtro: mezclo bandas según la posición para no iterar muestra a muestra
    bands = [bp(noise, max(60, f * 0.6), min(SR / 2 - 100, f * 1.6)) for f in np.geomspace(lo, hi, 6)]
    pos = np.sin(np.pi * t)  # sube y baja
    idx = pos * (len(bands) - 1)
    out = np.zeros(n)
    for k, b in enumerate(bands):
        w = np.clip(1 - np.abs(idx - k), 0, 1)
        out += b * w
    envl = np.sin(np.pi * t) ** 2
    return out * envl * 0.5


def bell(m, dur=1.4, bright=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = mtof(m)
    s = (np.sin(2 * np.pi * f * t) * np.exp(-t * 3.2)
         + 0.35 * bright * np.sin(2 * np.pi * f * 2.0 * t) * np.exp(-t * 6)
         + 0.18 * bright * np.sin(2 * np.pi * f * 3.01 * t) * np.exp(-t * 9)
         + 0.08 * bright * np.sin(2 * np.pi * f * 4.2 * t) * np.exp(-t * 14))
    return s * env_adsr(n, 0.003, 0, 1, 0.05)


def sfx_chime(notes=(74, 81), gap=0.07, bright=1.0):
    out = np.zeros(int((gap * len(notes) + 1.6) * SR))
    for k, m in enumerate(notes):
        b = bell(m, 1.5, bright)
        i = int(k * gap * SR)
        out[i:i + len(b)] += b * (0.9 ** k)
    return out * 0.5


def sfx_thump():
    n = int(0.5 * SR)
    t = np.arange(n) / SR
    f = 42 + 70 * np.exp(-t * 18)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 7) * env_adsr(n, 0.004, 0, 1, 0.05)


def sfx_flip():
    n = int(0.06 * SR)
    t = np.arange(n) / SR
    return bp(rng.standard_normal(n), 1800, 6000) * np.exp(-t * 120) * 0.35 + np.pad(sfx_pop(1300, 900, 0.05), (0, n))[:n] * 0.25


# ───────────────────────── música ─────────────────────────

# Progresión en D (cada acorde = 2 compases = 4 s)
CHORDS = [
    [50, 57, 61, 64, 66],  # Dmaj9
    [47, 54, 57, 61, 64],  # Bm9
    [43, 50, 54, 57, 62],  # Gmaj9 (sin 7 grave)
    [45, 52, 57, 59, 64],  # Asus2
]


def chord_at(t):
    return CHORDS[int(t // (BEAT * 8)) % len(CHORDS)]


def pad_layer():
    out = np.zeros((N, 2))
    seg = BEAT * 8
    for k in range(int(DUR / seg) + 1):
        t0 = k * seg
        notes = CHORDS[k % len(CHORDS)]
        n = int((seg + 1.5) * SR)
        t = np.arange(n) / SR
        e = env_adsr(n, 1.2, 0.5, 0.85, 1.6)
        for j, m in enumerate(notes):
            for det, pan in ((-0.07, -0.55), (0.07, 0.55)):
                f = mtof(m + det)
                # onda "suave": sen + un poco de 2º y 3º armónico
                s = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t) + 0.08 * np.sin(6 * np.pi * f * t)
                s *= e * (0.9 if j == 0 else 0.55) / len(notes)
                place(out, s, t0, 1.0, pan)
    out = np.stack([lp(out[:, 0], 1800), lp(out[:, 1], 1800)], axis=1)
    # leve respiración
    lfo = 0.85 + 0.15 * np.sin(2 * np.pi * np.arange(N) / SR / (BEAT * 4))
    return out * lfo[:, None]


def pluck(m, dur=0.6):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = mtof(m)
    s = np.sin(2 * np.pi * f * t + 0.6 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t * 18))
    return s * np.exp(-t * 7.5) * env_adsr(n, 0.003, 0, 1, 0.04)


def arp_layer(start, end):
    out = np.zeros((N, 2))
    step = BEAT / 2
    pattern = [0, 2, 4, 3, 1, 3, 4, 2]
    k = 0
    t = start
    while t < end:
        notes = chord_at(t)
        m = notes[pattern[k % 8] % len(notes)] + 12
        accent = 1.0 if k % 2 == 0 else 0.7
        place(out, pluck(m), t, 0.22 * accent, -0.35 if k % 2 else 0.35)
        t += step
        k += 1
    return out


def kick():
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    f = 48 + 90 * np.exp(-t * 30)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 11)


def hat():
    n = int(0.05 * SR)
    t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 7000) * np.exp(-t * 140)


def rhythm_layer(start, end):
    out = np.zeros((N, 2))
    b = 0
    t = start
    while t < end:
        if b % 2 == 0:
            place(out, kick(), t, 0.55)
        place(out, hat(), t + BEAT / 2, 0.07, 0.25)
        t += BEAT
        b += 1
    return out


def sub_layer():
    """Bajo sostenido con la fundamental de cada acorde."""
    out = np.zeros(N)
    seg = BEAT * 8
    for k in range(int(DUR / seg) + 1):
        root = CHORDS[k % len(CHORDS)][0] - 12
        n = int((seg + 0.3) * SR)
        t = np.arange(n) / SR
        s = np.sin(2 * np.pi * mtof(root) * t) * env_adsr(n, 0.4, 0.2, 0.8, 0.6)
        i = int(k * seg * SR)
        m = min(n, N - i)
        if m > 0:
            out[i:i + m] += s[:m]
    return np.stack([out, out], axis=1) * 0.22


def automation(points):
    """Curva de volumen por tramos lineales: [(seg, gain), ...]."""
    ts = np.arange(N) / SR
    return np.interp(ts, [p[0] for p in points], [p[1] for p in points])[:, None]


# ───────────────────────── eventos de UI ─────────────────────────

def typing_frames(text_len, at, cps):
    """Frames donde typed() de kit.tsx agrega un carácter."""
    frames = []
    prev = 0
    f = at
    while prev < text_len:
        n = min(text_len, max(0, math.floor((f - at) * cps)))
        if n > prev:
            frames.append(f)
            prev = n
        f += 1
    return frames


def build_sfx():
    """Frames de cada efecto: los de las animaciones de src/scenes.tsx (prog/pop)."""
    bus = np.zeros((N, 2))
    S = SCENES

    def at(scene, frame):
        return t_of(S[scene] + frame)

    # transiciones entre escenas (whoosh que termina en el corte)
    for name, f0 in S.items():
        if f0 == 0:
            continue
        place(bus, sfx_whoosh(0.5), t_of(f0) - 0.32, 0.22)

    # 1. pregunta: golpe al arrancar y pops por línea
    place(bus, sfx_thump(), at('hook', 1), 0.45)
    for i in range(3):
        place(bus, sfx_pop(640 + i * 110, 420, 0.1), at('hook', 4 + i * 9), 0.24)
    place(bus, sfx_whoosh(0.9, 500, 6000), at('hook', 20), 0.1)

    # 2. producto: logo, foto y chips
    place(bus, sfx_chime((62, 69, 74), 0.06, 0.6), at('product', 2), 0.32)
    place(bus, sfx_whoosh(0.45, 300, 3000), at('product', 8), 0.16)
    place(bus, sfx_thump(), at('product', 14), 0.3)
    for i in range(3):
        place(bus, sfx_pop(820 + i * 100, 560, 0.08), at('product', (84, 118, 138)[i]), 0.22)

    # 3. pureza: el contador sube con teclas y cierra con chime; tildes de los ítems
    for fr in range(10, 52, 3):
        place(bus, sfx_key(), at('purity', fr), 0.14, rng.uniform(-0.15, 0.15))
    place(bus, sfx_chime((74, 78, 81), 0.06, 0.9), at('purity', 52), 0.4)
    for i in range(3):
        place(bus, sfx_pop(700 + i * 90, 480, 0.1), at('purity', 106 + i * 10), 0.26)

    # 4. lote: certificado aprobado, después el tipeo del número y el clic en «Verificar»
    place(bus, sfx_whoosh(0.4, 400, 3500), at('lot', 14), 0.12)
    place(bus, sfx_chime((74, 78, 81, 86), 0.07, 1.0), at('lot', 40), 0.45)
    for i in range(4):
        place(bus, sfx_flip(), at('lot', 46 + i * 8), 0.3)
    place(bus, sfx_whoosh(0.35, 500, 4000), at('lot', 82), 0.1)
    for fr in typing_frames(len('202604-013'), 98, 1 / 1.8):
        place(bus, sfx_key(), at('lot', fr), 0.3, 0.1 + rng.uniform(-0.1, 0.1))
    place(bus, sfx_click(), at('lot', 121), 0.55)

    # 5. cómo se toma
    place(bus, sfx_pop(900, 600, 0.1), at('howto', 4), 0.28)
    for i in range(3):
        place(bus, sfx_pop(760 + i * 120, 500, 0.1), at('howto', (47, 66, 94)[i]), 0.26)

    # 6. entrenamiento: un golpe por palabra
    for fr in (22, 38, 58):
        place(bus, sfx_thump(), at('training', fr), 0.3)
        place(bus, sfx_pop(560, 360, 0.1), at('training', fr), 0.14)

    # 7. presentaciones
    for i, fr in enumerate((44, 78, 104)):
        place(bus, sfx_whoosh(0.35, 600, 4500), at('range', fr) - 0.05, 0.1, -0.4 if i % 2 == 0 else 0.4)
        place(bus, sfx_pop(620 + i * 120, 420, 0.1), at('range', fr + 8), 0.22)

    # 8. cierre
    place(bus, sfx_thump(), at('outro', 1), 0.45)
    place(bus, sfx_chime((62, 69, 74, 78), 0.08, 0.7), at('outro', 3), 0.42)
    place(bus, sfx_pop(900, 600, 0.12), at('outro', 74), 0.3)
    place(bus, sfx_chime((78, 81), 0.06, 0.6), at('outro', 78), 0.25)
    return bus


def music():
    """Pad en todo el video; bajo, arpegio y ritmo entran con el producto. El ritmo se va antes
    del cierre y el arpegio baja en el cierre."""
    t_product, t_outro, end = T('product'), T('outro'), DUR
    pad = pad_layer()
    sub = sub_layer()
    arp = arp_layer(t_product, end)
    rhy = rhythm_layer(t_product, t_outro)
    return (
        pad * automation([(0, 0.0), (0.4, 0.9), (t_outro, 0.9), (t_outro + 0.5, 1.0), (end - 1.2, 1.0), (end, 0.0)])
        + sub * automation([(0, 0), (t_product - 0.3, 0), (t_product, 1), (t_outro, 1), (end - 1.2, 0.6), (end, 0)])
        + arp * automation([(0, 0), (t_product, 0), (t_product + 1.5, 1), (t_outro, 1), (t_outro + 1, 0.5), (end, 0.0)])
        + rhy * automation([(0, 0), (t_product, 0), (t_product + 1, 0.9), (t_outro - 0.5, 0.9), (t_outro, 0.0)])
    )


def limit(mix, drive=1.4):
    """Quita sub-graves inútiles y aplica un limitador suave (tanh)."""
    mix = hp(mix.T, 25).T
    peak = np.abs(mix).max()
    return np.tanh(mix / peak * drive) / np.tanh(drive) * 0.89


def main(out_path):
    mix = reverb(music(), 0.35) * 0.48 + reverb(build_sfx(), 0.18)
    wavfile.write(out_path, SR, (limit(mix) * 32767).astype(np.int16))
    print('ok', out_path, f'{len(mix) / SR:.2f}s')


if __name__ == '__main__':
    main(sys.argv[1])
