
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

const props = {
  p: 3,
  q: 3,
  s: .5,
}

const fn = x => {
  const { p, q, s } = props
  return easeInLinearEaseOut(x, p, q, s)
}

const plot = () => {
  main.plot('ease', fn, {
    color: 'red',
  })
}

plot()

main.plot('linear', x => x)

main.sliders.P.onChange(p => {
  props.p = p
  plot()
})

main.sliders.Q.onChange(q => {
  props.q = q
  plot()
})

