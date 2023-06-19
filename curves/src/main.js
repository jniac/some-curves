import { htmlf } from './htmlf.js'
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
  /**
   * @param {(value: any, observable: Observable) => void} callback 
   * @returns {boolean}
   */
  onChange(callback) {
    if (!callback) {
      throw new Error(`invalid callback`)
    }
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
  const { id } = div
  const [value, min, max] = parseSliderParams(div.dataset.params)

  htmlf('label', {
    parent: div,
    innerHTML: id,
  })

  const range = htmlf('input', {
    parent: div,
    type: 'range',
    step: 'any',
    min,
    max,
    value,
  })

  const text = htmlf('input', {
    parent: div,
    type: 'text',
    value,
  })
  
  const valueObs = new Observable(value, {
    valueMapper: value => (value < min ? min : value > max ? max : value),
  })

  valueObs.onChange(value => {
    range.value = value.toString()
    text.value = value.toFixed(2)
  })

  range.oninput = () => {
    valueObs.setValue(Number.parseFloat(range.value))
  }

  sliders[id] = valueObs
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

const vLine = (name, { x = .5, range = [0, 1], color = '#ccc' } = {}) => {
  const [min, max] = range
  svgf(`line#${name}`, {
    'stroke': color,
    'fill': 'none',
    'x1': x * scaleFactor,
    'x2': x * scaleFactor,
    'y1': min * -scaleFactor,
    'y2': max * -scaleFactor,
    'stroke-dasharray': '1 1.5',
  })
}

export { svg, ui, plot, sliders, vLine }
