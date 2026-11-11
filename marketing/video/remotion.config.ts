import { existsSync } from 'node:fs'
import { Config } from '@remotion/cli/config'

// The bundled headless Chrome crashes on this Mac (ICU data); the installed one works.
// In a Claude Code cloud session (Linux VM) CHROME_PATH points to its Chrome for Testing.
const SYSTEM_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const chrome = [process.env.CHROME_PATH, SYSTEM_CHROME].find((p) => p && existsSync(p))
if (chrome) {
  Config.setBrowserExecutable(chrome)
}
