"""Genera la voz en off por API de ElevenLabs (una frase por archivo, texto de SAY).

Sólo sirve con plan pago: el plan free bloquea las voces de la biblioteca por API
(402 paid_plan_required) y la versión actual se generó a mano en la web (ver README).
La API key se lee de ELEVEN_API_KEY (nunca se guarda en disco); el modelo, de
ELEVEN_MODEL (verificar en la doc de ElevenLabs el id del modelo que se use en la web).
Uso: ELEVEN_API_KEY=... ELEVEN_MODEL=... python3 audio/tts.py <voice_id> [números de frase...]
"""
import json
import os
import sys
import urllib.error
import urllib.request

from script import SAY

KEY = os.environ['ELEVEN_API_KEY']
MODEL = os.environ.get('ELEVEN_MODEL', 'eleven_multilingual_v2')
VOICE = sys.argv[1]
ONLY = {int(i) for i in sys.argv[2:]}
OUT = os.path.join(os.path.dirname(__file__), 'voice', 'lines')
os.makedirs(OUT, exist_ok=True)

for n, text in enumerate(SAY, start=1):
    if ONLY and n not in ONLY:
        continue
    body = {
        'text': text,
        'model_id': MODEL,
        'language_code': 'es',  # con detección automática "Un link. Un monto." salía en francés
        'voice_settings': {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.15, 'use_speaker_boost': True, 'speed': 1.0},
    }
    req = urllib.request.Request(
        f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128',
        data=json.dumps(body).encode(),
        headers={'xi-api-key': KEY, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg'},
    )
    try:
        with urllib.request.urlopen(req) as r:
            data = r.read()
    except urllib.error.HTTPError as e:
        print(n, 'ERROR', e.code, e.read()[:300].decode(errors='replace'))
        sys.exit(1)
    path = os.path.join(OUT, f'{n:02d}.mp3')
    open(path, 'wb').write(data)
    print(n, f'{len(text)} chars ->', path)
