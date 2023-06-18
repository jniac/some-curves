import { svgf } from './svgf.js'

export const svg = document.querySelector('svg')

const scaleFactor = 400

svg.setAttributeNS(null, 'viewBox', '-100 -500 600 600')

/**
 * @param {string} str
 */
const parseSliderParams = str => {
  const [valueStr] = str.match(/@\S+/)
  const value = Number.parseFloat(valueStr.substring(1))
  const [, rangeStr] = str.match(/\[(.*)\]/)
  const [min, max] = rangeStr.split(/\s*,\s*/).map(s => Number.parseFloat(s))
  return [value, min, max]
}

const ui = document.querySelector('#ui')
for (const div of ui.querySelectorAll('.slider')) {
  const paramsStr = div.dataset.params
  const [value, min, max] = parseSliderParams(paramsStr)
  const input = document.createElement('input')
  input.setAttribute('type', 'range')
  input.setAttribute('min', min.toString())
  input.setAttribute('max', max.toString())
  input.setAttribute('value', value.toString())
  div.append(input)
}

/**
 *
 * @param {string} name
 * @param {(x: number) => number} fn
 * @param {[min: number, max: number]} range
 */
export const plot = (name, fn, {
  range = [0, 1],
  color = '#ccc',
} = {}) => {
  const [min, max] = range
  const count = scaleFactor
  const points = Array.from({ length: count + 1 }).map((_, index) => {
    const t = min + (max - min) * index / count
    let x = t
    let y = fn(x)
    x *= scaleFactor
    y *= -scaleFactor
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  svgf(`polyline#${name}`, {
    stroke: color,
    fill: 'none',
    points,
  })
}
