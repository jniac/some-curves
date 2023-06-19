/**
 * Powerful ease function that chains together an ease-in and ease-out curves by 
 * a linear interval. The ease-in and ease-out curves use separate coefficient,
 * making very easy to transform a transition from ease in/out to a pure ease-in 
 * or ease-out.
 * 
 * The function is actually NOT optimized (could it be?) and involves from 4 to 5
 * power (to compute internal threshold, and the output when x corresponds to
 * the ease in or out phase).
 * 
 * https://jniac.github.io/some-curves/curves/ease-in-linear-ease-out/
 * https://www.desmos.com/calculator/3izcjwwok7
 * 
 * @param {number} x The current transition value from 0 to 1.
 * @param {number} p The "ease-in" coefficient.
 * @param {number} q The "ease-out" coefficient.
 * @param {number} s The "linear" proportion (0: no linear, 1: full linear)
 */
export const easeInLinearEaseOut = (x, p, q, s) => {
  const EPSILON = 1e-6
  const p1 = Math.abs(p - 1) < EPSILON ? 1 / Math.E : (1 / p) ** (1 / (p - 1))
  const q1 = Math.abs(q - 1) < EPSILON ? 1 / Math.E : (1 / q) ** (1 / (q - 1))
  const w = (p1 + q1) / (1 - s)
  const x1 = p1 / w
  const x2 = 1 - q1 / w
  const p2 = p1 ** p
  const q2 = q1 ** q
  const a = w - p1 + p2 - q1 + q2
  if (x < 0) {
    return 0
  }
  if (x > 1) {
    return 1
  }
  if (s >= 1) {
    return x
  }
  if (x < x1) {
    return ((x * w) ** p) / a
  }
  if (x > x2) {
    return 1 - (((1 - x) * w) ** q) / a
  }
  return (x * w - p1 + p2) / a
}

export const easeInLinearEaseOut_computeX1X2 = (p, q, s) => {
  const EPSILON = 1e-6
  const p1 = Math.abs(p - 1) < EPSILON ? 1 / Math.E : (1 / p) ** (1 / (p - 1))
  const q1 = Math.abs(q - 1) < EPSILON ? 1 / Math.E : (1 / q) ** (1 / (q - 1))
  const w = (p1 + q1) / (1 - s)
  const x1 = p1 / w
  const x2 = 1 - q1 / w
  return [x1, x2]
}
