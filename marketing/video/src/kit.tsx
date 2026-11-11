import React from 'react'
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion'
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat'
import { loadFont as loadZenDots } from '@remotion/google-fonts/ZenDots'

export const { fontFamily: SANS } = loadMontserrat('normal', { weights: ['500', '600', '700', '800'], subsets: ['latin'] })
export const { fontFamily: DISPLAY } = loadZenDots('normal', { weights: ['400'], subsets: ['latin'] })

// Paleta de marca (docs/brand-pdf-system.md)
export const C = {
  brand: '#cc5e21',
  brandDark: '#a34a18',
  brandLight: '#f2d8c4',
  sand: '#ccb89d',
  ink: '#3f4140',
  graphite: '#5b5d5c',
  cream: '#f7f6f5',
  border: '#e4e1dc',
  muted: '#8d908f',
  white: '#ffffff',
}

// Video vertical 1080×1920. Reels/TikTok tapan ~220 px arriba y ~380 px abajo: lo importante va entre esos márgenes.
export const W = 1080
export const H = 1920

export const ease = Easing.bezier(0.22, 1, 0.36, 1)
export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

/** 0→1 entre dos frames con easing. */
export function prog(frame: number, from: number, to: number, e = ease) {
  return interpolate(frame, [from, to], [0, 1], { ...clamp, easing: e })
}

/** Fondo crema con un patrón de chevrons muy tenue. */
export const Stage: React.FC<{ children?: React.ReactNode; bg?: string }> = ({ children, bg = C.cream }) => (
  <AbsoluteFill style={{ background: bg, fontFamily: SANS, color: C.ink }}>{children}</AbsoluteFill>
)

/** Entrada/salida de cada escena: fade + blur + leve escala. */
export const SceneFade: React.FC<{ dur: number; children: React.ReactNode; inF?: number; outF?: number }> = ({
  dur, children, inF = 8, outF = 8,
}) => {
  const f = useCurrentFrame()
  const a = prog(f, 0, inF)
  const b = 1 - prog(f, dur - outF, dur, Easing.in(Easing.quad))
  const o = Math.min(a, b)
  return (
    <AbsoluteFill style={{ fontFamily: SANS, opacity: o, filter: `blur(${(1 - o) * 10}px)`, transform: `scale(${0.985 + 0.015 * a})` }}>
      {children}
    </AbsoluteFill>
  )
}

/** Palabras que aparecen una a una (blur → nítido, leve subida). */
export const Words: React.FC<{
  text: string
  at: number
  stagger?: number
  style?: React.CSSProperties
  accent?: string[]
  accentColor?: string
}> = ({ text, at, stagger = 3, style, accent = [], accentColor = C.brand }) => {
  const f = useCurrentFrame()
  const words = text.split(' ')
  return (
    <span style={{ display: 'inline', ...style }}>
      {words.map((w, i) => {
        const p = prog(f, at + i * stagger, at + i * stagger + 14)
        const isAccent = accent.includes(w.replace(/[.,¿?:]/g, ''))
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: p,
              transform: `translateY(${(1 - p) * 26}px)`,
              filter: `blur(${(1 - p) * 8}px)`,
              color: isAccent ? accentColor : undefined,
              whiteSpace: 'pre',
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </span>
  )
}

export const FadeUp: React.FC<{ at: number; dur?: number; y?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  at, dur = 16, y = 30, children, style,
}) => {
  const f = useCurrentFrame()
  const p = prog(f, at, at + dur)
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * y}px)`, ...style }}>{children}</div>
}

/** Pop con rebote suave (escala 0.6 → 1). */
export function pop(frame: number, at: number, dur = 14) {
  const p = prog(frame, at, at + dur, Easing.bezier(0.34, 1.56, 0.64, 1))
  return { opacity: prog(frame, at, at + 6), transform: `scale(${0.6 + 0.4 * p})` }
}

/** Etiqueta chica en mayúsculas con raya (eyebrow de la web). */
export const Eyebrow: React.FC<{ children: React.ReactNode; color?: string; style?: React.CSSProperties }> = ({
  children, color = C.brand, style,
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 18, color, fontWeight: 800, fontSize: 30, letterSpacing: 7, textTransform: 'uppercase', ...style }}>
    <span style={{ width: 56, height: 4, background: color }} />
    {children}
  </div>
)

export const Pill: React.FC<{ children: React.ReactNode; bg?: string; color?: string; style?: React.CSSProperties }> = ({
  children, bg = C.white, color = C.ink, style,
}) => (
  <div
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 14, background: bg, color, borderRadius: 999, padding: '20px 34px',
      fontWeight: 800, fontSize: 32, letterSpacing: 2, textTransform: 'uppercase', boxShadow: '0 14px 40px rgba(63,65,64,0.12)', ...style,
    }}
  >
    {children}
  </div>
)

export const Check: React.FC<{ size?: number; color?: string; bg?: string }> = ({ size = 44, color = C.white, bg = C.brand }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill={bg} />
    <path d="M6.5 12.5l3.5 3.5 7.5-8" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Isotipo y logotipo: mismos paths que src/components/logo.tsx de la web
export const LogoMark: React.FC<{ size: number; white?: boolean; draw?: number }> = ({ size, white = false, draw = 1 }) => {
  const chevron = white ? C.white : C.brand
  const arrows = white ? C.white : C.graphite
  const a = (k: number) => ({
    opacity: interpolate(draw, [k * 0.25, k * 0.25 + 0.5], [0, 1], clamp),
    transform: `translateX(${interpolate(draw, [k * 0.25, k * 0.25 + 0.5], [-14, 0], clamp)}px)`,
  })
  return (
    <svg width={size} height={size} viewBox="76.7 76.5 146.6 147">
      <polygon style={a(2)} fill={arrows} points="158.71 85.17 149.95 76.47 130.07 96.36 141.92 108.22 150 100.14 199.63 149.78 150 199.41 141.92 191.33 130.09 203.17 141.2 214.29 150 223.53 158.8 214.29 223.31 149.78 158.71 85.17" />
      <polygon style={a(0)} fill={arrows} points="100.37 149.78 122.19 127.95 110.34 116.1 76.69 149.78 110.35 183.44 122.19 171.6 100.37 149.78" />
      <polygon style={a(1)} fill={chevron} points="108.06 217.31 96.22 205.47 151.91 149.78 96.36 94.23 108.2 82.39 175.59 149.78 108.06 217.31" />
    </svg>
  )
}

export const Wordmark: React.FC<{ width: number; fill?: string }> = ({ width, fill = C.ink }) => (
  <svg width={width} height={(width * 53) / 246} viewBox="27 178 246 53">
    <g fill={fill}>
      <path d="M27.32,230.14l19.52-51.04h54.54l-3.55,9.28h-43.12l-5.4,14.13h37.55l-3.55,9.28h-37.55l-7.01,18.35h-11.42Z" />
      <path d="M89.71,230.14l19.52-51.04h55.97l-3.55,9.28h-44.54l-4.31,11.28h40.4l-3.55,9.28h-40.4l-4.56,11.92h44.54s-3.55,9.28-3.55,9.28h-55.97Z" />
      <path d="M179.67,230.5c-9.42,0-15.8-2.18-19.13-6.53-3.33-4.36-3.36-10.81-.08-19.38,3.26-8.52,8.22-14.97,14.89-19.35,6.67-4.38,14.71-6.54,24.11-6.5l25.64.14-3.49,9.14h-24.91c-6.19,0-11.28,1.31-15.28,3.93-4,2.62-7.11,6.83-9.33,12.64-2.22,5.81-2.34,10.03-.35,12.67,1.99,2.64,6.08,3.96,12.26,3.96h25.63l-3.55,9.28h-26.41Z" />
      <path d="M209.07,230.14l42.5-51.04h17.63l3.47,51.04h-12.42l-.73-10.78h-29.05l-8.98,10.78h-12.42ZM238.16,210.09h20.77l-1.49-22.06h-.93l-18.36,22.06Z" />
    </g>
  </svg>
)

/** Foto a pantalla completa con zoom lento (Ken Burns) y un degradé para que se lea el texto. */
export const PhotoBg: React.FC<{ src: string; dur: number; from?: number; to?: number; origin?: string; shade?: string }> = ({
  src, dur, from = 1.04, to = 1.14, origin = '50% 50%', shade,
}) => {
  const f = useCurrentFrame()
  const s = interpolate(f, [0, dur], [from, to], clamp)
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${s})`, transformOrigin: origin }} />
      {shade && <AbsoluteFill style={{ background: shade }} />}
    </AbsoluteFill>
  )
}

/** Chevrons grandes de la marca que se deslizan de fondo (decoración). */
export const ChevronTrail: React.FC<{ color?: string; opacity?: number; y?: number; speed?: number }> = ({
  color = C.brand, opacity = 0.08, y = 0, speed = 3,
}) => {
  const f = useCurrentFrame()
  return (
    <AbsoluteFill style={{ opacity, overflow: 'hidden' }}>
      {[0, 1, 2, 3].map((i) => (
        <svg
          key={i}
          width={620}
          height={620}
          viewBox="0 0 100 100"
          style={{ position: 'absolute', top: 650 + y, left: -700 + i * 520 + ((f * speed) % 520) }}
        >
          <polygon fill={color} points="20 0 38 0 88 50 38 100 20 100 70 50" />
        </svg>
      ))}
    </AbsoluteFill>
  )
}
