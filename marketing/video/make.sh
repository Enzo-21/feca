#!/usr/bin/env bash
# Pipeline del video vertical de FECA: audio (música + efectos + voz) → render → ~/Desktop/feca-redes.
# Uso: ./make.sh [audio|preview|render|all]   (por defecto: all)
#   audio   → public/audio.wav (mezcla final con voz, −16 LUFS) y out/music.wav (sin voz)
#   preview → out/stills/fNNNN.jpg: un fotograma de cada escena, para revisar el diseño
#   render  → out/feca-promo-vertical.mp4 y copia (con su texto, captions/) en ~/Desktop/feca-redes/videos/
# CONCURRENCY: hilos de Remotion; por defecto 6 o los núcleos disponibles si son menos
set -euo pipefail
shopt -s nullglob
cd "$(dirname "$0")"
step="${1:-all}"
cores=$(getconf _NPROCESSORS_ONLN 2>/dev/null || echo 6)
conc=${CONCURRENCY:-$(( cores < 6 ? cores : 6 ))}
ff() { npx remotion ffmpeg -hide_banner -v error -y "$@"; }
loudnorm=loudnorm=I=-16:TP=-1.5:LRA=11
redes=~/Desktop/feca-redes
# un fotograma por escena de src/timeline.json, con las animaciones de entrada ya terminadas
frames="70 260 420 610 740 880 1025 1180"
mkdir -p out public

if [[ $step == audio || $step == all ]]; then
  python3 audio/make_audio.py out/music-raw.wav
  ff -i out/music-raw.wav -af "$loudnorm" -ar 48000 out/music.wav
  # sin frases grabadas (o con algunas), mix_voice.py mezcla lo que haya y avisa qué NN.mp3 faltan
  for f in audio/voice/lines/*.mp3; do ff -i "$f" -ac 1 -ar 48000 "${f%.mp3}.wav"; done
  PYTHONPATH=audio python3 audio/mix_voice.py out/voice-mix-raw.wav
  ff -i out/voice-mix-raw.wav -af "$loudnorm" -ar 48000 public/audio.wav
fi

if [[ $step == preview ]]; then
  mkdir -p out/stills
  npx remotion bundle src/index.ts --out-dir out/bundle >/dev/null
  for fr in ${FRAMES:-$frames}; do
    npx remotion still out/bundle PromoVertical "out/stills/f$(printf %04d "$fr").jpg" --frame="$fr" --scale=0.5 --image-format=jpeg --props='{"audio":false}' >/dev/null
  done
  ls out/stills
fi

if [[ $step == render || $step == all ]]; then
  npx remotion render src/index.ts PromoVertical out/feca-promo-vertical.mp4 --codec=h264 --crf=16 --concurrency="$conc" --timeout=120000
  mkdir -p $redes/videos
  cp out/feca-promo-vertical.mp4 captions/feca-promo-vertical.txt $redes/videos/
  ls -la $redes/videos/feca-promo-vertical.mp4
fi
