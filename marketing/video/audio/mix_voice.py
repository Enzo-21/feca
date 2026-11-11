"""Mezcla música + efectos + voz en off (ElevenLabs, voz Valeria, Eleven v4).

Lee una frase por archivo (audio/voice/lines/NN.wav, ver make.sh), recorta los
silencios de las puntas, la acelera apenas si hace falta (TEMPO, time-stretch sin
cambiar el tono) y la ubica dentro de su escena: arranca hasta 0,4 s después del corte
(o en FIXED_START) y termina antes del siguiente. Mientras habla, baja la música y los
efectos (ducking). Si falta alguna frase, la mezcla sale igual sin ella y avisa cuáles
NN.mp3 faltan (sin ninguna, public/audio.wav queda con música + efectos).
Uso: PYTHONPATH=audio python3 audio/mix_voice.py <salida.wav>
"""
import os
import subprocess
import sys
import tempfile

import numpy as np
from scipy.io import wavfile
from scipy.signal import filtfilt

import make_audio as m
from script import LINES

# Frases a acelerar para que entren en su escena ({índice: tempo}): las 8 suman 37,7 s de voz en 40 s de video
TEMPO = {0: 1.08, 1: 1.12, 2: 1.12, 3: 1.12, 4: 1.1, 5: 1.1, 6: 1.1, 7: 1.1}
# Arranque (segundos desde el corte de su escena); las que no figuran usan el arranque automático.
FIXED_START = {0: 0.15, 1: 0.3, 2: 0.25, 3: 0.2, 4: 0.15, 5: 0.25, 6: 0.25, 7: 0.3}
MAX_OFFSET = 0.4
END_MARGIN = 0.12
LINES_DIR = 'audio/voice/lines'


def stretch(seg, sr, tempo):
    with tempfile.TemporaryDirectory() as d:
        src, dst = os.path.join(d, 'in.wav'), os.path.join(d, 'out.wav')
        wavfile.write(src, sr, (np.clip(seg, -1, 1) * 32767).astype(np.int16))
        subprocess.run(['npx', 'remotion', 'ffmpeg', '-v', 'error', '-y', '-i', src, '-af', f'atempo={tempo}', dst], check=True)
        return wavfile.read(dst)[1].astype(np.float64) / 32768


def trim(x, sr):
    hop = int(0.01 * sr)
    e = np.array([np.sqrt(np.mean(x[i:i + hop] ** 2)) for i in range(0, len(x) - hop, hop)])
    v = np.where(e > e.max() * 0.02)[0]
    pad = int(0.06 * sr)
    return x[max(0, v[0] * hop - pad): min(len(x), (v[-1] + 1) * hop + pad)]


def main(out_path):
    voice = np.zeros(m.N)
    active = np.zeros(m.N)
    missing = []
    for k, line in enumerate(LINES):
        path = os.path.join(LINES_DIR, f'{k + 1:02d}.wav')
        if not os.path.exists(path):
            missing.append(f'{k + 1:02d}.mp3')
            continue
        sr, x = wavfile.read(path)
        assert sr == m.SR
        seg = trim(m.hp(x.astype(np.float64) / 32768, 80), sr)
        if TEMPO.get(k, 1) != 1:
            seg = stretch(seg, sr, TEMPO[k])
        f = int(0.02 * sr)
        seg[:f] *= np.linspace(0, 1, f)
        seg[-f:] *= np.linspace(1, 0, f)
        start = m.T(line['scene'])
        end = start + m.SCENE_DUR[line['scene']] / m.FPS
        length = len(seg) / sr
        if k in FIXED_START:
            t0 = start + FIXED_START[k]
        else:
            t0 = start + max(0.05, min(MAX_OFFSET, end - END_MARGIN - start - length))
        assert t0 + length <= end + 0.05, (line['text'], t0 + length, end)
        i = int(t0 * sr)
        n = min(len(seg), m.N - i)
        voice[i:i + n] += seg[:n]
        active[i:i + n] = 1
        print(f'{t0:6.2f} → {t0 + length:6.2f}  (escena {start:5.2f}–{end:5.2f})  {line["text"]}')

    alpha = 1 - np.exp(-1 / (0.15 * m.SR))
    duck = np.clip(filtfilt([alpha], [1, alpha - 1], active), 0, 1)[:, None]

    music = m.reverb(m.music(), 0.35) * 0.48 * (1 - 0.6 * duck)  # ≈ −8 dB bajo la voz
    sfx = m.reverb(m.build_sfx(), 0.18) * (1 - 0.35 * duck)  # ≈ −4 dB bajo la voz

    act = active > 0
    if act.any():
        # voz ~3x más fuerte (RMS) que la música mientras habla
        voice *= 3.0 * np.sqrt(np.mean(music[act] ** 2)) / np.sqrt(np.mean(voice[act] ** 2))
    mix = music + sfx + np.stack([voice, voice], axis=1)
    wavfile.write(out_path, m.SR, (m.limit(mix, 1.1) * 32767).astype(np.int16))
    if missing:
        print(f'FALTAN {len(missing)} de {len(LINES)} frases de la voz en {LINES_DIR}/: {", ".join(missing)}')
        print('  Grabarlas en ElevenLabs (texto de SAY en audio/script.py) y moverlas con audio/take.sh NN.')
    print('ok', out_path)


if __name__ == '__main__':
    main(sys.argv[1])
