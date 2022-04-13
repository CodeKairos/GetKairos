import type { ApiContract } from '~/remote/apiContract'
import { ApiSessionStorage } from '~/remote/apiSessionStorage'
import { ApiJsonServer } from '~/remote/apiJsonServer'

function initAPI(name: string, serverBaseURL?: string): ApiContract {
  if (name === 'session storage') {
    const api = new ApiSessionStorage()
    return api
  }

  if (name === 'json-server') {
    if (!serverBaseURL) throw new Error('You should define some server URL!')
    const api = new ApiJsonServer(serverBaseURL)
    return api
  }

  throw new Error('Unknown interface name!')
}

export { initAPI }
