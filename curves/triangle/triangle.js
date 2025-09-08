export const triangle = (x, { frequency = 1, phase = 0 } = {}) => {
  let x1 = x * frequency + phase
  let x2 = x1 * 2
  let y = x2 - Math.floor(x2)
  return (
    x1 - Math.floor(x1) < 0.5
      ? y
      : 1 - y
  )
}
