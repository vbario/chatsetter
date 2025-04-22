const firebaseService = require('./firebase')
const db = firebaseService.db
const axios = require('axios')

let clientIdCalendly = process.env.CALENDLY_CLIENT_ID
let clientSecretCalendly = process.env.CALENDLY_SECRET

let getAccessTokenCalendly = async (uid) => {
  return new Promise(async (resolve, reject) => {
    let _token = await db.ref('/calendly_tokens/' + (uid || 'f')).once('value')
    let token = _token.val()
    return resolve(token)
  })
}
let getMyCalendlyEvents = async (uid) => {
  let token = await getAccessTokenCalendly(uid)
  return new Promise(async (resolve, reject) => {
    let url = `https://api.calendly.com/scheduled_events?organization=${encodeURIComponent(token.organization)}`
    await axios.get(url, {}, {
      'Authorization': `Bearer ${token.access_token}`,
      'Content-Type': 'application/json'
    })
    .then(async (response) => {
      console.log('Events:')
      console.log(response.data)
      return resolve(response.data)
    })
    .catch(async (error) => {
        return reject(error.response ? error.response.data : error.message)
    })
  })
}
// await getMyCalendlyEvents('KV97m6R5H5hwr2b44lG9bb7gMto1')
async function refreshTokenCalendly(uid) {
  let token = await getAccessTokenCalendly(uid)
  console.log('token', token)
  const tokenEndpoint = `https://auth.calendly.com/oauth/refresh`
  try {
      const response = await axios.post(tokenEndpoint, {}, {
        params: {
          client_id: clientIdCalendly,
          client_secret: clientSecretCalendly,
          token: token.refresh_token
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      const data = response.data;
      console.log('data', data)
      return data
  } catch (error) {
      console.error('Error refreshing token', error)
      return false
  }
}
// refreshTokenCalendly('KV97m6R5H5hwr2b44lG9bb7gMto1')

let getUserCalendly = async (uid) => {
  let token = await getAccessTokenCalendly(uid)
  return new Promise(async (resolve, reject) => {
    let url = `https://api.calendly.com/users/me`
    await axios.get(url, {}, {
      'Authorization': `Bearer ${token.access_token}`,
      'Content-Type': 'application/json'
    })
    .then(async (response) => {
      console.log('User:')
      console.log(response.data)
      return resolve(response.data)
    })
    .catch(async (error) => {
      console.log('Error')
      console.log(error)
    })
  })
}
// getUserCalendly('KV97m6R5H5hwr2b44lG9bb7gMto1')

async function exchangeCodeForTokenCalendly(code) {
  console.log('exchanging', code)
    const tokenEndpoint = `https://auth.calendly.com/oauth/token`
    try {
        const response = await axios.post(tokenEndpoint, {}, {
          params: {
            client_id: clientIdCalendly,
            client_secret: clientSecretCalendly,
            grant_type: 'authorization_code',
            redirect_uri: redirectUriCalendly,
            code
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

        const data = response.data;
        return data
    } catch (error) {
        console.error('Error exchanging code for token:', error)
        return false
    }
}
exports.getAccessTokenCalendly = getAccessTokenCalendly
exports.getMyCalendlyEvents = getMyCalendlyEvents
exports.refreshTokenCalendly = refreshTokenCalendly
exports.getUserCalendly = getUserCalendly
exports.exchangeCodeForTokenCalendly = exchangeCodeForTokenCalendly