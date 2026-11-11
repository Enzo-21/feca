# Guion de la voz en off: una frase por escena (`scene`, nombres de src/timeline.json).
# mix_voice.py ubica cada frase dentro de su escena y falla si alguna no entra.
LINES = [
    {'text': '¿Sabés de verdad qué tiene tu creatina?', 'scene': 'hook'},
    {'text': 'Esto es FECA: creatina monohidrato 200 mesh, 100% pura.', 'scene': 'product'},
    {'text': 'Más de 99,5% de pureza. Sin aditivos ni sabores.', 'scene': 'purity'},
    {'text': 'Cada lote tiene su certificado de análisis público. Lo verificás en la web con el número de tu envase.', 'scene': 'lot'},
    {'text': 'Cinco gramos por día, con agua, cuando quieras. Así de simple.', 'scene': 'howto'},
    {'text': 'Para acompañar tu fuerza, tu potencia y tu recuperación.', 'scene': 'training'},
    {'text': 'Elegí tu formato: 300 gramos, 500 o un kilo.', 'scene': 'range'},
    {'text': 'FECA. Impulsa tu rutina. Pedila en creatinafeca.com.ar', 'scene': 'outro'},
]

# Texto exacto que se generó en ElevenLabs (Eleven v4, voz Valeria, idioma Spanish),
# una frase por generación: pronunciación escrita como se dice y etiquetas de tono.
SAY = [
    '[curious] ¿Sabés de verdad qué tiene tu creatina?',
    '[warmly] Esto es Feca: creatina monohidrato, doscientos mesh, cien por ciento pura.',
    '[warmly] Más de noventa y nueve coma cinco por ciento de pureza. Sin aditivos ni sabores.',
    '[warmly] Cada lote tiene su certificado de análisis público. Lo verificás en la web, con el número de tu envase.',
    '[warmly] Cinco gramos por día, con agua, cuando quieras. Así de simple.',
    '[warmly] Para acompañar tu fuerza, tu potencia y tu recuperación.',
    '[warmly] Elegí tu formato: trescientos gramos, quinientos, o un kilo.',
    '[warmly] Feca. Impulsa tu rutina. Pedila en creatina feca punto com punto ar.',
]
