
import * as main from '../src/main.js'

/**
 * https://www.desmos.com/calculator/3izcjwwok7
 * @param {number} x 
 * @param {number} p 
 * @param {number} q 
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

const easeInLinearEaseOut_computeX1X2 = (p, q, s) => {
  const EPSILON = 1e-6
  const p1 = Math.abs(p - 1) < EPSILON ? 1 / Math.E : (1 / p) ** (1 / (p - 1))
  const q1 = Math.abs(q - 1) < EPSILON ? 1 / Math.E : (1 / q) ** (1 / (q - 1))
  const w = (p1 + q1) / (1 - s)
  const x1 = p1 / w
  const x2 = 1 - q1 / w
  return [x1, x2]
}

const props = {
  p: 3,
  q: 3,
  s: .5,
}

main.plot('linear', x => x)

const plot = () => {
  const { p, q, s } = props
  const [x1, x2] = easeInLinearEaseOut_computeX1X2(p, q, s)
  const fn = x => easeInLinearEaseOut(x, p, q, s)
  main.plot('ease', fn, {
    color: 'red',
  })
  main.vLine('x1', {
    x: x1,
    color: '#f00',
  })
  main.vLine('x2', {
    x: x2,
    color: '#f00',
  })
}

plot()

main.sliders.P.onChange(p => {
  props.p = p
  plot()
})

main.sliders.Q.onChange(q => {
  props.q = q
  plot()
})

main.sliders.S.onChange(s => {
  props.s = s
  plot()
})

