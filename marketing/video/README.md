# Video promocional de FECA (vertical)

Proyecto Remotion independiente (no forma parte del build de la web: `tsconfig.json` y `eslint.config.mjs` de la raíz
excluyen `marketing/`). Video de 40 s, 1080×1920 (9:16), 30 fps, para Reels, TikTok y Shorts. Armado sobre la base
de los promos de vexor y mercadosuite (`~/Documents/vexor/marketing/video`): mismo pipeline de audio y de voz.

## Uso

```bash
./make.sh audio     # música + efectos + voz → public/audio.wav (y out/music.wav sin voz)
./make.sh preview   # un fotograma por escena → out/stills/
./make.sh render    # out/feca-promo-vertical.mp4 y copia (con captions/) en ~/Desktop/feca-redes/videos/
./make.sh           # audio + render
```

`remotion.config.ts` hace que Remotion use el Chrome instalado: el Chrome headless que trae Remotion se cae en esta
Mac. Dentro del sandbox de Claude Code, `preview` y `render` pueden colgarse: en ese caso, correrlos desde una terminal.

## Estructura

| Archivo | Qué tiene |
| --- | --- |
| `src/timeline.json` | Escenas y duración de cada una en frames (las leen el video y el audio) |
| `src/Root.tsx` | Composición `PromoVertical` |
| `src/kit.tsx` | Colores y tipografías de marca, animaciones, logo (mismos paths que `src/components/logo.tsx`) |
| `src/scenes.tsx` | Pregunta, Producto, Pureza, Lote, Cómo se toma, Entrenamiento, Presentaciones, Cierre |
| `public/` | Fotos del producto (copias de `public/images/` de la web) |
| `audio/make_audio.py` | Música (pad, bajo, arpegio y ritmo a 120 BPM) y efectos sincronizados con las animaciones |
| `audio/script.py` | Guion: `LINES` (frase y escena) y `SAY` (texto exacto que se generó) |
| `audio/voice/lines/NN.mp3` | Las 8 frases de la voz |
| `audio/mix_voice.py` | Ubica cada frase en su escena (falla si no entra), time-stretch (`TEMPO`) y ducking |
| `audio/take.sh` | Mueve la última descarga de ElevenLabs a `audio/voice/lines/NN.mp3` |
| `captions/feca-promo-vertical.txt` | Texto para pegar al publicar |

Todas las duraciones son múltiplos de 15 frames (un tiempo a 120 BPM). Los frames de las animaciones de
`scenes.tsx` están sincronizados con las pausas de cada frase grabada; los efectos de `build_sfx()` usan los mismos
frames: si cambiás uno, cambiá el otro.

## Datos

- Pureza, creatinina, metales pesados y vencimiento: certificado real del lote `202604-013` (`data/lotes/`).
- Gramos y servicios de cada presentación: `src/lib/products.ts`. **Sin precios**: cambian y la fuente única es
  `products.ts`; si algún día se muestran, leerlos de ahí.

## Voz

- ElevenLabs, voz "Valeria – Cheerful, Youthful, Catchy", modelo Eleven v4, idioma Spanish fijo, una generación por
  frase (se bajó la Generation 1). `[curious]` en la pregunta del inicio y `[warmly]` en el resto; "Feca" y la URL
  escritas como se pronuncian.
- Las 8 frases suman 37,7 s: van entre un 8 % y un 12 % más rápidas (`TEMPO` en `mix_voice.py`) para que entren en 40 s.
- Para regrabar la frase `NN`: generarla en la web, bajarla y correr `audio/take.sh NN`. Después `./make.sh`.
- **Licencia:** revisar el plan de ElevenLabs de la cuenta antes de usarlo en anuncios: el plan free no incluye uso
  comercial (en ese caso, regenerar las 8 frases de `SAY` con un plan pago y correr `./make.sh`).
