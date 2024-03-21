export const psine = (x, p) => {
  const s = Math.sin(x)
  const sign = s < 0 ? -1 : 1
  const r = 1 - Math.pow(1 - sign * s, p)
  return r * sign
}

export const pcosine = (x, p = 3) => {
  const s = Math.cos(x)
  const sign = s < 0 ? -1 : 1
  const r = 1 - Math.pow(1 - sign * s, p)
  return r * sign
}
