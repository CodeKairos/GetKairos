import type { ApiContract } from '~/remote/apiContract'
import { ApiSessionStorage } from '~/remote/apiSessionStorage'
function initAPI(name: string): ApiContract {
  if (name === 'session storage') {
    const api = new ApiSessionStorage()
    return api
  }
  if (name === 'json-server') {
    const api = new ApiSessionStorage()
    return api
  }
  throw new Error('Unknown interface name!')
}

export { initAPI }
