import { svgf } from './svgf.js'

const svg = document.querySelector('svg')
const ui = document.querySelector('#ui')

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

class Observable {
  #props = {
    value: null,
    valueOld: null,
    valueMapper: null,
    listeners: new Set(),
  }
  constructor(initialValue, { valueMapper = null } = {}) {
    this.#props.value = initialValue
  }
  #callListeners() {
    const { value, listeners } = this.#props
    for (const listener of listeners) {
      listener(value, this)
    }
  }
  setValue(value) {
    const { value: valueOld, valueMapper } = this.#props
    if (valueMapper) {
      value = valueMapper(value)
    }
    if (value === valueOld) {
      return false
    }
    this.#props.valueOld = valueOld
    this.#props.value = value
    this.#callListeners()
    return true
  }
  onChange(callback) {
    this.#props.listeners.add(callback)
    const destroy = () => {
      this.#props.listeners.delete(callback)
    }
    return { destroy }
  }
  // Sugar-syntax:
  get value() {
    return this.#props.value
  }
  set value(value) {
    this.setValue(value)
  }
  get valueOld() {
    return this.#props.valueOld
  }
}

/** @type {Record<string, Observable>} */
const sliders = {}

for (const div of ui.querySelectorAll('.slider')) {
  const paramsStr = div.dataset.params
  const [value, min, max] = parseSliderParams(paramsStr)
  const input = document.createElement('input')
  input.setAttribute('type', 'range')
  input.setAttribute('min', min.toString())
  input.setAttribute('max', max.toString())
  input.setAttribute('value', value.toString())
  input.setAttribute('step', 'any')
  div.append(input)
  const obs = new Observable(value, {
    valueMapper: value => (value < min ? min : value > max ? max : value),
  })
  input.oninput = () => {
    obs.setValue(Number.parseFloat(input.value))
  }
  sliders[div.id] = obs
}

/**
 *
 * @param {string} name
 * @param {(x: number) => number} fn
 * @param {[min: number, max: number]} range
 */
const plot = (name, fn, { range = [0, 1], color = '#ccc' } = {}) => {
  const [min, max] = range
  const count = scaleFactor
  const points = Array.from({ length: count + 1 })
    .map((_, index) => {
      const t = min + ((max - min) * index) / count
      let x = t
      let y = fn(x)
      x *= scaleFactor
      y *= -scaleFactor
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  svgf(`polyline#${name}`, {
    stroke: color,
    fill: 'none',
    points,
  })
}

export { svg, ui, plot, sliders }
