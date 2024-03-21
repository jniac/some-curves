const getSvg = () => document.querySelector('svg')

/**
 *
 * @param {SVGSVGElement} svg
 * @param {string} identifier
 * @returns {SVGElement}
 */
const resolveIdentifier = (svg, identifier) => {
  const [tagName, id] = identifier.split('#')
  if (id) {
    const element = svg.querySelector(identifier)
    if (element) {
      return element
    }
  }
  const element = document.createElementNS(
    'http://www.w3.org/2000/svg',
    tagName
  )
  if (id) {
    element.id = id
  }
  return element
}

/**
 *
 * @param {string | SVGElement} identifier
 * @param {Record<string, string | number | SVGElement | null>} props
 * @returns {SVGElement}
 */
export const svgf = (identifier, props) => {
  const svg = getSvg()

  const element =
    typeof identifier !== 'string'
      ? identifier
      : resolveIdentifier(svg, identifier)

  const { parent = svg, precision = 1, ...attributeProps } = props

  if (parent instanceof SVGElement) {
    if (element.parentElement !== parent) {
      parent.append(element)
    }
  } else {
    console.log('Oops', parent)
    throw new Error('Oops')
  }

  function camelToKebab(str) {
    // Use a regular expression to insert a hyphen before all lowercase letters following an uppercase letter
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }

  for (const key in attributeProps) {
    const rawValue = attributeProps[key]
    const safeKey = camelToKebab(key)
    if (rawValue === null) {
      element.removeAttributeNS(null, safeKey)
    } else if (typeof rawValue === 'object') {
      console.log('Oops', rawValue)
      throw new Error('Oops')
    } else {
      const strValue =
        typeof rawValue === 'number' ? rawValue.toFixed(precision) : rawValue
      element.setAttributeNS(null, safeKey, strValue)
    }
  }

  return element
}
