import * as main from '../src/main.js'
import { psine } from './psine.js'

main.viewBox({ min: { x: -2 * Math.PI, y: -1 }, max: { x: 2 * Math.PI, y: 1 } })

const props = {
  p: 3,
}

function plot() {
  const fn = x => psine(x, props.p)
  main.plot('psine', fn, {
    range: [-2 * Math.PI, 2 * Math.PI],
    color: 'red',
    strokeWidth: 4,
    drawInsideMargin: true,
  })
}

main.sliders.P.onChange(p => {
  props.p = p
  plot()
})

plot()