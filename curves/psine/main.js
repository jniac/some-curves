import * as main from '../src/main.js'
import { pcosine, psine } from './psine.js'

main.viewBox({ min: { x: -2 * Math.PI, y: -1 }, max: { x: 2 * Math.PI, y: 1 } })

const props = {
  p: 3,
}

function plot() {
  const fn1 = x => psine(x, props.p)
  const fn2 = x => pcosine(x, props.p)
  main.plot('psine', [fn1, fn2], {
    range: [-2 * Math.PI, 2 * Math.PI],
    color: ['red', 'blue'],
    strokeWidth: 4,
    drawInsideMargin: true,
  })
}

main.sliders.P.onChange(p => {
  props.p = p
  plot()
})

plot()