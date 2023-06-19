/**
 *
 * @param {HTMLElement} parent
 * @param {string} identifier
 * @returns {HTMLElement}
 */
const resolveIdentifier = (parent, identifier) => {
  const [tagName, id] = identifier.split('#')
  if (id) {
    const element = parent.querySelector(identifier)
    if (element) {
      return element
    }
  }
  const element = document.createElement(tagName)
  if (id) {
    element.id = id
  }
  return element
}

/**
 *
 * @param {string | HTMLElement} identifier
 * @param {Record<string, string | number | HTMLElement | null>} props
 * @returns {HTMLElement}
 */
export const htmlf = (identifier, props) => {
  const element =
    typeof identifier !== 'string'
      ? identifier
      : resolveIdentifier(document.body, identifier)

  const {
    parent = document.body,
    precision = 1,
    innerHTML,
    ...attributeProps
  } = props

  if (innerHTML !== undefined) {
    element.innerHTML = innerHTML
  }

  if (parent instanceof HTMLElement) {
    if (element.parentElement !== parent) {
      parent.append(element)
    }
  } else {
    console.log('Oops', parent)
    throw new Error('Oops')
  }

  for (const key in attributeProps) {
    const rawValue = attributeProps[key]
    if (rawValue === null) {
      element.removeAttribute(key)
    } else if (typeof rawValue === 'object') {
      console.log('Oops', rawValue)
      throw new Error('Oops')
    } else {
      const strValue =
        typeof rawValue === 'number' ? rawValue.toFixed(precision) : rawValue
      element.setAttribute(key, strValue)
    }
  }

  return element
}
