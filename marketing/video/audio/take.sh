#!/usr/bin/env bash
# Mueve la última descarga de ElevenLabs a audio/voice/lines/NN.mp3 y muestra su duración.
set -e
cd "$(dirname "$0")"
f=$(ls -t ~/Downloads/ElevenLabs_*.mp3 | head -1)
mv "$f" "voice/lines/$1.mp3"
npx remotion ffprobe -v error -show_entries format=duration -of csv=p=0 "voice/lines/$1.mp3"
