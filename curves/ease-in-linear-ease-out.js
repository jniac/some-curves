
import * as main from './src/main.js'

/**
 * https://www.desmos.com/calculator/3izcjwwok7
 * @param {number} x 
 * @param {number} p 
 * @param {number} q 
 * @param {number} s The "linear" proportion (0: no linear, 1: full linear)
 */
export const easeInLinearEaseOut = (x, p, q, s) => {
  const p1 = (1 / p) ** (1 / (p - 1))
  const p2 = p1 ** p
  const q1 = (1 / q) ** (1 / (q - 1))
  const q2 = q1 ** q
  const w = (p1 + q1) / (1 - s)
  const a = w - p1 + p2 - q1 + q2
  const x1 = p1 / w
  const x2 = 1 - q1 / w
  if (x < 0) {
    return 0
  }
  if (x > 1) {
    return 1
  }
  if (x < x1) {
    return ((x * w) ** p) / a
  }
  if (x > x2) {
    return 1 - (((1 - x) * w) ** q) / a
  }
  return (x * w - p1 + p2) / a
}

main.plot('linear', x => x)
main.plot('ease', x => easeInLinearEaseOut(x, 3, 3, .5), {
  color: 'red',
})
