
import * as main from '../src/main.js'
import { easeInLinearEaseOut_computeX1X2, easeInLinearEaseOut } from './ease-in-linear-ease-out.js'

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

