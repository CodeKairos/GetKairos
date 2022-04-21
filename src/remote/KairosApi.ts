import type { ApiContract } from '~/remote/ApiContract'
import { ApiSessionStorage } from '~/remote/ApiSessionStorage'
import { ApiJsonServer } from '~/remote/ApiJsonServer'
// import { ApiFirestore } from '~/remote/ApiFirestore'

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

  // if (name === 'firestore') {
  //   if (!serverBaseURL) throw new Error('You should define some server URL!')
  //   const api = new ApiFirestore()
  //   return api
  // }

  throw new Error('Unknown interface name!')
}

export { initAPI }
