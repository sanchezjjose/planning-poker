export const endpoint = process.env.NODE_ENV === 'production'
  ? 'https://planning-poker-nodejs.ue.r.appspot.com'
  : 'http://localhost:3001'

export const points = ['0', '0.5', '1', '2', '3', '5', '8', '13'];
