import React from 'react'
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion'
import {
  C, DISPLAY, SANS, Check, ChevronTrail, Eyebrow, FadeUp, LogoMark, Pill, PhotoBg, SceneFade, Stage, Words, Wordmark,
  clamp, pop, prog,
} from './kit'

type S = React.FC<{ dur: number }>

const display: React.CSSProperties = { fontFamily: DISPLAY, textTransform: 'uppercase', lineHeight: 1.08 }
const center: React.CSSProperties = { position: 'absolute', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }

// 1. Pregunta de enganche
export const Hook: S = ({ dur }) => {
  const f = useCurrentFrame()
  const lines = ['¿Sabés qué', 'tiene tu', 'creatina?']
  const scan = interpolate(f, [20, 90], [560, 1360], clamp)
  return (
    <SceneFade dur={dur} inF={1}>
      <Stage bg={C.ink}>
        <ChevronTrail opacity={0.1} speed={4} />
        <div style={{ ...center, top: 640, gap: 10 }}>
          {lines.map((l, i) => (
            <div key={l} style={{ ...display, fontSize: 104, color: i === 2 ? C.brand : C.white }}>
              <Words text={l} at={4 + i * 9} stagger={4} />
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 120, right: 120, top: scan, height: 4, background: C.brand, opacity: prog(f, 20, 28) * (1 - prog(f, 84, 96)), boxShadow: `0 0 40px ${C.brand}` }} />
      </Stage>
    </SceneFade>
  )
}

// 2. El producto
export const Product: S = ({ dur }) => {
  const f = useCurrentFrame()
  const p = prog(f, 10, 34)
  const zoom = interpolate(f, [0, dur], [1.0, 1.08], clamp)
  const chips = ['200 mesh', '100% pura', 'Marca argentina']
  return (
    <SceneFade dur={dur}>
      <Stage>
        <ChevronTrail opacity={0.05} y={200} speed={2} />
        <div style={{ ...center, top: 250, flexDirection: 'row', justifyContent: 'center', gap: 26 }}>
          <LogoMark size={112} draw={prog(f, 0, 22) * 1.5} />
          <div style={{ opacity: prog(f, 8, 20), transform: `translateX(${(1 - prog(f, 8, 22)) * -20}px)` }}>
            <Wordmark width={340} />
          </div>
        </div>
        <div style={{ ...center, top: 420 }}>
          <div style={{ ...display, fontSize: 70, color: C.ink }}><Words text="Creatina" at={40} /></div>
          <div style={{ ...display, fontSize: 70, color: C.brand }}><Words text="monohidrato" at={46} /></div>
        </div>
        <div
          style={{
            position: 'absolute', left: 130, top: 640, width: 820, height: 820, borderRadius: 64, overflow: 'hidden',
            boxShadow: '0 40px 90px rgba(63,65,64,0.22)', opacity: p, transform: `translateY(${(1 - p) * 90}px) scale(${0.92 + 0.08 * p})`,
          }}
        >
          <Img src={staticFile('producto-creatina-1kg-1x1.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})` }} />
        </div>
        <div style={{ ...center, top: 1500, flexDirection: 'row', justifyContent: 'center', gap: 18 }}>
          {chips.map((c, i) => (
            <div key={c} style={pop(f, [84, 118, 138][i])}>
              <Pill style={{ fontSize: 28, padding: '18px 28px' }} bg={i === 1 ? C.brand : C.white} color={i === 1 ? C.white : C.ink}>{c}</Pill>
            </div>
          ))}
        </div>
      </Stage>
    </SceneFade>
  )
}

// 3. Pureza
export const Purity: S = ({ dur }) => {
  const f = useCurrentFrame()
  const v = interpolate(f, [10, 52], [90, 99.5], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) })
  const bar = prog(f, 10, 52)
  return (
    <SceneFade dur={dur}>
      <Stage>
        <div style={{ ...center, top: 330 }}>
          <FadeUp at={2}><Eyebrow>Pureza garantizada</Eyebrow></FadeUp>
        </div>
        <div style={{ ...center, top: 470 }}>
          <div style={{ ...display, color: C.brand, fontSize: 230, display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <svg width={86} height={110} viewBox="0 0 86 110" style={{ alignSelf: 'center', marginRight: 6 }}>
              <path d="M12 12 L74 40 L12 68" fill="none" stroke={C.graphite} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 96 L74 96" stroke={C.graphite} strokeWidth={13} strokeLinecap="round" />
            </svg>
            {v.toFixed(1).replace('.', ',')}
            <span style={{ fontSize: 120 }}>%</span>
          </div>
          <div style={{ width: 820, height: 22, borderRadius: 11, background: C.border, marginTop: 30, overflow: 'hidden' }}>
            <div style={{ width: `${bar * 99.5}%`, height: '100%', borderRadius: 11, background: `linear-gradient(90deg, ${C.sand}, ${C.brand})` }} />
          </div>
          <FadeUp at={40} style={{ marginTop: 34, fontWeight: 800, fontSize: 36, letterSpacing: 6, color: C.graphite, textTransform: 'uppercase' }}>
            de creatina monohidrato
          </FadeUp>
        </div>
        <div style={{ ...center, top: 1080, gap: 30 }}>
          {['Sin aditivos', 'Sin sabores', 'Sin rellenos'].map((t, i) => (
            <div key={t} style={{ ...pop(f, 106 + i * 10), display: 'flex', alignItems: 'center', gap: 24, background: C.white, borderRadius: 30, padding: '26px 44px', width: 640, boxShadow: '0 14px 40px rgba(63,65,64,0.10)' }}>
              <Check size={58} />
              <span style={{ fontWeight: 800, fontSize: 44, color: C.ink, textTransform: 'uppercase', letterSpacing: 2 }}>{t}</span>
            </div>
          ))}
        </div>
      </Stage>
    </SceneFade>
  )
}

// 4. Certificado de análisis por lote (datos reales del lote 202604-013, data/lotes/ de la web)
const LOT = '202604-013'
const ROWS: [string, string, string][] = [
  ['Pureza (assay)', '99,80 %', '≥ 99,5 %'],
  ['Creatinina', '34 ppm', '≤ 100 ppm'],
  ['Metales pesados', '< 0,5 ppm', '≤ 0,5 ppm'],
  ['Vencimiento', 'abr. 2029', ''],
]
export const Lot: S = ({ dur }) => {
  const f = useCurrentFrame()
  // la frase dice primero «certificado» (aparece la tarjeta de abajo) y después «lo verificás en la web» (la búsqueda)
  const typed = LOT.slice(0, Math.max(0, Math.floor((f - 98) / 1.8)))
  const press = prog(f, 120, 124) * (1 - prog(f, 126, 132))
  const res = prog(f, 16, 34)
  const search = prog(f, 84, 100)
  return (
    <SceneFade dur={dur}>
      <Stage>
        <div style={{ ...center, top: 250 }}>
          <FadeUp at={0}><Eyebrow>Calidad verificable</Eyebrow></FadeUp>
          <div style={{ ...display, fontSize: 70, color: C.ink, marginTop: 26 }}><Words text="Cada lote," at={4} /></div>
          <div style={{ ...display, fontSize: 70, color: C.brand }}><Words text="certificado" at={10} /></div>
        </div>
        <div style={{ position: 'absolute', left: 80, top: 620, width: 920 }}>
          <div style={{ background: C.white, borderRadius: 44, padding: 44, boxShadow: '0 30px 80px rgba(63,65,64,0.16)', opacity: search, transform: `translateY(${(1 - search) * 60}px)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: C.muted, fontWeight: 600, fontSize: 28 }}>
              <LogoMark size={44} />
              creatinafeca.com.ar/calidad
            </div>
            <div style={{ marginTop: 34, fontWeight: 800, fontSize: 26, letterSpacing: 4, color: C.muted, textTransform: 'uppercase' }}>Número de lote</div>
            <div style={{ display: 'flex', gap: 18, marginTop: 14 }}>
              <div style={{ flex: 1, border: `3px solid ${f > 96 ? C.brand : C.border}`, borderRadius: 22, padding: '22px 28px', fontWeight: 700, fontSize: 46, color: C.ink, fontVariantNumeric: 'tabular-nums' }}>
                {typed}
                <span style={{ opacity: f > 96 && f < 128 && Math.floor(f / 8) % 2 === 0 ? 1 : 0, color: C.brand }}>|</span>
              </div>
              <div style={{ background: C.brand, color: C.white, borderRadius: 22, padding: '0 34px', display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: 32, textTransform: 'uppercase', transform: `scale(${1 - press * 0.06})` }}>
                Verificar
              </div>
            </div>
          </div>
          <div style={{ marginTop: 28, background: C.white, borderRadius: 44, padding: '38px 44px', boxShadow: '0 30px 80px rgba(63,65,64,0.16)', opacity: res, transform: `translateY(${(1 - res) * 70}px)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: 4, color: C.muted, textTransform: 'uppercase' }}>Certificado de análisis</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 44, color: C.ink, marginTop: 6 }}>Lote {LOT}</div>
              </div>
              <div style={{ ...pop(f, 40), display: 'flex', alignItems: 'center', gap: 12, background: C.brandLight, color: C.brandDark, borderRadius: 999, padding: '14px 24px', fontWeight: 800, fontSize: 28, textTransform: 'uppercase' }}>
                <Check size={36} /> Aprobado
              </div>
            </div>
            <div style={{ height: 2, background: C.sand, margin: '26px 0 10px' }} />
            {ROWS.map(([k, v, spec], i) => (
              <div key={k} style={{ display: 'flex', alignItems: 'baseline', padding: '16px 0', borderBottom: i < ROWS.length - 1 ? `2px solid ${C.border}` : 'none', opacity: prog(f, 46 + i * 8, 58 + i * 8), fontSize: 34 }}>
                <span style={{ flex: 1, fontWeight: 600, color: C.graphite }}>{k}</span>
                <span style={{ fontWeight: 800, color: C.brand, fontVariantNumeric: 'tabular-nums' }}>{v}</span>
                <span style={{ width: 210, textAlign: 'right', fontWeight: 600, color: C.muted, fontSize: 28 }}>{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </Stage>
    </SceneFade>
  )
}

// 5. Cómo se toma
export const HowTo: S = ({ dur }) => {
  const f = useCurrentFrame()
  const pills = ['Con agua', 'Cuando quieras', 'Así de simple']
  return (
    <SceneFade dur={dur}>
      <PhotoBg
        src="product-action-table.jpeg"
        dur={dur}
        from={1.02}
        to={1.12}
        origin="55% 60%"
        shade="linear-gradient(180deg, rgba(30,24,20,0.72) 0%, rgba(30,24,20,0.15) 34%, rgba(30,24,20,0) 55%, rgba(30,24,20,0.6) 100%)"
      />
      <div style={{ ...center, top: 250, color: C.white }}>
        <div style={{ ...display, fontSize: 200, textTransform: 'none', ...pop(f, 4, 16) }}>5 g</div>
        <div style={{ ...display, fontSize: 76, marginTop: -6 }}><Words text="por día" at={12} /></div>
      </div>
      <div style={{ ...center, top: 1250, gap: 22 }}>
        {pills.map((t, i) => (
          <div key={t} style={pop(f, [47, 66, 94][i])}>
            <Pill bg={i === 2 ? C.brand : C.white} color={i === 2 ? C.white : C.ink} style={{ fontSize: 40, padding: '24px 46px' }}>
              <Check size={46} bg={i === 2 ? C.white : C.brand} color={i === 2 ? C.brand : C.white} /> {t}
            </Pill>
          </div>
        ))}
      </div>
    </SceneFade>
  )
}

// 6. Entrenamiento
export const Training: S = ({ dur }) => {
  const f = useCurrentFrame()
  const words: [string, number][] = [['Fuerza', 22], ['Potencia', 38], ['Recuperación', 58]]
  return (
    <SceneFade dur={dur}>
      <PhotoBg
        src="hero-athletes.png"
        dur={dur}
        from={1.06}
        to={1.16}
        origin="32% 35%"
        shade="linear-gradient(180deg, rgba(20,20,20,0.1) 0%, rgba(20,20,20,0) 35%, rgba(20,20,20,0.78) 72%, rgba(20,20,20,0.9) 100%)"
      />
      <div style={{ position: 'absolute', left: 90, top: 1180, color: C.white }}>
        <div style={{ fontWeight: 800, fontSize: 40, letterSpacing: 6, textTransform: 'uppercase', opacity: prog(f, 6, 18) }}>Para acompañar tu</div>
        {words.map(([w, at], i) => {
          const p = prog(f, at, at + 12)
          const active = f >= at && (i === words.length - 1 || f < words[i + 1][1])
          return (
            <div key={w} style={{ marginTop: 10, opacity: p, transform: `translateX(${(1 - p) * -60}px)` }}>
              <span style={{ ...display, display: 'inline-block', fontSize: 80, padding: '4px 20px', borderRadius: 16, background: active ? C.brand : 'transparent', color: C.white }}>
                {w}
              </span>
            </div>
          )
        })}
      </div>
    </SceneFade>
  )
}

// 7. Presentaciones (gramos y servicios de src/lib/products.ts de la web; sin precios: cambian)
const RANGE: [string, string, number, string | null][] = [
  ['producto-creatina-300g-1x1.jpg', '300 g', 60, null],
  ['producto-creatina-500g-1x1.jpg', '500 g', 100, 'Más elegido'],
  ['producto-creatina-1kg-1x1.jpg', '1 kg', 200, 'Mejor precio por kg'],
]
export const Range: S = ({ dur }) => {
  const f = useCurrentFrame()
  const at = [44, 78, 104]
  return (
    <SceneFade dur={dur}>
      <Stage>
        <div style={{ ...center, top: 250 }}>
          <FadeUp at={0}><Eyebrow>Elegí tu formato</Eyebrow></FadeUp>
          <div style={{ ...display, fontSize: 64, color: C.ink, marginTop: 24 }}><Words text="Tres presentaciones" at={6} accent={['presentaciones']} /></div>
        </div>
        {RANGE.map(([img, size, servings, badge], i) => {
          const p = prog(f, at[i], at[i] + 16)
          return (
            <div
              key={size}
              style={{
                position: 'absolute', left: 90, top: 480 + i * 330, width: 900, height: 290, background: C.white, borderRadius: 40,
                display: 'flex', alignItems: 'center', gap: 40, padding: 20, boxShadow: '0 24px 60px rgba(63,65,64,0.14)',
                border: badge === 'Más elegido' ? `4px solid ${C.brand}` : '4px solid transparent',
                opacity: p, transform: `translateX(${(1 - p) * (i % 2 ? 140 : -140)}px)`,
              }}
            >
              <Img src={staticFile(img)} style={{ width: 250, height: 250, borderRadius: 28, objectFit: 'cover' }} />
              <div>
                <div style={{ fontFamily: DISPLAY, fontSize: 84, color: C.ink, lineHeight: 1 }}>{size}</div>
                <div style={{ fontWeight: 700, fontSize: 34, color: C.graphite, marginTop: 14 }}>{servings} servicios de 5 g</div>
                {badge && (
                  <div style={{ ...pop(f, at[i] + 10), display: 'inline-block', marginTop: 16, background: C.brand, color: C.white, borderRadius: 999, padding: '8px 20px', fontWeight: 800, fontSize: 24, letterSpacing: 2, textTransform: 'uppercase' }}>
                    {badge}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </Stage>
    </SceneFade>
  )
}

// 8. Cierre
export const Outro: S = ({ dur }) => {
  const f = useCurrentFrame()
  return (
    <SceneFade dur={dur} outF={1}>
      <Stage bg={C.brand}>
        <ChevronTrail color={C.white} opacity={0.08} speed={3} />
        <div style={{ ...center, top: 470 }}>
          <div style={{ transform: `scale(${0.85 + 0.15 * prog(f, 0, 20)})` }}>
            <LogoMark size={260} white draw={prog(f, 0, 24) * 1.5} />
          </div>
          <div style={{ marginTop: 40, opacity: prog(f, 10, 24), transform: `translateY(${(1 - prog(f, 10, 26)) * 24}px)` }}>
            <Wordmark width={560} fill={C.white} />
          </div>
          <div style={{ ...display, fontSize: 52, color: C.white, marginTop: 50, letterSpacing: 4 }}>
            <Words text="Impulsa tu rutina" at={30} stagger={4} />
          </div>
          <div style={{ marginTop: 90, ...pop(f, 74) }}>
            <Pill bg={C.white} color={C.brand} style={{ fontSize: 44, padding: '28px 54px', letterSpacing: 1, textTransform: 'none', fontFamily: SANS }}>
              creatinafeca.com.ar
            </Pill>
          </div>
          <FadeUp at={96} style={{ marginTop: 34, color: C.white, fontWeight: 700, fontSize: 32, letterSpacing: 3, textTransform: 'uppercase' }}>
            Pedidos por WhatsApp
          </FadeUp>
        </div>
      </Stage>
    </SceneFade>
  )
}
