import React from 'react'
import { AbsoluteFill, Audio, Composition, Sequence, staticFile } from 'remotion'
import timeline from './timeline.json'
import { C, H, W } from './kit'
import { Hook, Product, Purity, Lot, HowTo, Training, Range, Outro } from './scenes'

// 40 s a 30 fps, vertical 1080×1920 (Reels, TikTok, Shorts). Duraciones en src/timeline.json (las lee también el audio).
const COMPONENTS: Record<string, React.FC<{ dur: number }>> = {
  hook: Hook, product: Product, purity: Purity, lot: Lot, howto: HowTo, training: Training, range: Range, outro: Outro,
}
const SCENES = timeline.scenes as [string, number][]
export const TOTAL = SCENES.reduce((n, [, d]) => n + d, 0)

const PromoVertical: React.FC<{ audio: boolean }> = ({ audio }) => {
  let from = 0
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      {/* música + efectos + voz: audio/ → public/audio.wav (make.sh audio) */}
      {audio && <Audio src={staticFile('audio.wav')} />}
      {SCENES.map(([name, dur]) => {
        const S = COMPONENTS[name]
        const el = (
          <Sequence key={name} from={from} durationInFrames={dur} name={name}>
            <S dur={dur} />
          </Sequence>
        )
        from += dur
        return el
      })}
    </AbsoluteFill>
  )
}

export const Root: React.FC = () => (
  <Composition id="PromoVertical" component={PromoVertical} defaultProps={{ audio: true }} durationInFrames={TOTAL} fps={timeline.fps} width={W} height={H} />
)
