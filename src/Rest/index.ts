import * as CONSTANTS from '../../CONSTANTS'
import RNFetchBlob from 'rn-fetch-blob'
import SetCookieParser from "set-cookie-parser"

const KANAL = 'kanal=3'

let AUTH_URL = CONSTANTS.PROD_URL.AUTH
let MISIREST_URL = CONSTANTS.PROD_URL.MISIREST
let UTBREST_URL = CONSTANTS.PROD_URL.UTBREST
let SKICKAEPOSTREST_URL = CONSTANTS.PROD_URL.SKICKAEPOSTREST

if (__DEV__) {
  AUTH_URL = CONSTANTS.TEST_URL.AUTH
  MISIREST_URL = CONSTANTS.TEST_URL.MISIREST
  UTBREST_URL = CONSTANTS.TEST_URL.UTBREST
  SKICKAEPOSTREST_URL = CONSTANTS.TEST_URL.SKICKAEPOSTREST
}

let sessionCookies: Array<[string, string]> = [];

export function login() {
  return fetch(AUTH_URL, {
    credentials: 'include'
  })
    .then(response => {
      if (response.status !== 200) {
        return logout()
          .then(logoutResponse => logoutResponse)
          .catch(error => {
            throw new Error(error)
          })
      }
      sessionCookies = sessionCookies.concat(get_set_cookies(response.headers))
      return response.json()
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

export function logout() {
  return fetch(`${MISIREST_URL}/logout`, {
    credentials: 'include'
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`logout ${response.status}: ${response.text}`)
      }
      return
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

export function postFormResponse(personalNumber: string) {
  return fetch(AUTH_URL, {
    method: 'POST',
    credentials: 'include',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'formresponse',
      form: [
        {
          name: 'pnr',
          value: personalNumber
        }
      ]
    })
  })
    .then(response => {
      if (response.status !== 200) {
        return logout()
          .then(logoutResponse => logoutResponse)
          .catch(error => {
            throw new Error(error)
          })
      }
      sessionCookies = sessionCookies.concat(get_set_cookies(response.headers))
      return response.json()
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

export function postLaunchResponse() {
  return fetch(AUTH_URL, {
    method: 'POST',
    credentials: 'include',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'launchresponse'
    })
  })
    .then(response => {
      if (response.status !== 200) {
        return logout()
          .then(logoutResponse => logoutResponse)
          .catch(error => {
            throw new Error(error)
          })
      }
      sessionCookies = sessionCookies.concat(get_set_cookies(response.headers))
      return response.json()
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

export function getUtbetalningar() {
  return fetch(`${UTBREST_URL}/utbetalningar?${KANAL}`, {
    credentials: 'include'
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`getUtbetalningar ${response.status}: ${response.text}`)
      }
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.type === 'formrequest') {
        throw new AuthenticationError('Not logged in')
      }
      return jsonResponse
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

export function skickaEpost(score: number, meddelande: string) {
  const email = {
    meddelandeSomSkickas: `${score}, ${meddelande}`,
    mottagare: 'skickaepost.app.omrade.val',
    avsandare: 'app@fk.se'
  }

  return fetch(`${SKICKAEPOSTREST_URL}/epost?${KANAL}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(email)
  }).catch(error => {
    console.log(error)
    throw new Error(error)
  })
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, AuthenticationError.prototype)
  }
}

export function getPdf(specification: number) {
  const cookiesToSend = sessionCookies
  .map(cookie => {
    const parsedCookie = SetCookieParser.parse(cookie)
    return `${parsedCookie.name}=${parsedCookie.value}`
  })
  .join('; ')

  const url = `${UTBREST_URL}/utbetalningar/specifikation?id=${specification}&${KANAL}`
  console.log('get PDF from: ' + url)
  return RNFetchBlob.config({ fileCache: true })
    .fetch('GET', url, {Cookie: cookiesToSend})
    .then(response => {
      console.log('PDF RESPONSE: ' + response)
      return Promise.resolve(response.path())
    })
}

function get_set_cookies(headers: Headers) {
  const setCookies = []
  for (const [name, value] of headers) {
    if (name === 'set-cookie') {
      setCookies.push(value)
    }
  }
  return setCookies
}
