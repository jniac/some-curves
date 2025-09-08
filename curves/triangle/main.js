import * as main from '../src/main.js'
import { triangle } from './triangle.js'

main.viewBox({ min: { x: -4, y: -1 }, max: { x: 4, y: 1 } })

const props = {
  p: 3,
}

function plot() {
  main.plot('triangle', [
    x => triangle(x, { frequency: 1 }),
    x => triangle(x, { frequency: 2 }),
    x => triangle(x, { frequency: 2, phase: props.p }),
  ], {
    range: [-4, 4],
    color: ['red', 'blue', 'green'],
    strokeWidth: 4,
    drawInsideMargin: true,
  })
}

main.sliders.P.onChange(p => {
  props.p = p
  plot()
})

plot()