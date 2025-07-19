// Polyfills for Node.js modules
import { Buffer } from 'buffer'
import util from 'util'
import stream from 'stream-browserify'

// Make them available globally
window.Buffer = Buffer
window.util = util
window.stream = stream

// Also set them on globalThis for broader compatibility
globalThis.Buffer = Buffer
globalThis.util = util
globalThis.stream = stream 