export const makeCode = () => {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let c = ''
  for (let i = 0; i < 6; i++) {
    c += s.charAt(Math.floor(Math.random() * s.length))
  }
  return c
}
