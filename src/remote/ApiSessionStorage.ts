import type { ApiContract } from '~/remote/ApiContract'
import type { ApiContractTags } from '~/remote/ApiContractTags'
const prefix = 'kairos-'
// const users = 'users'
async function setTags(tagCloudName: string, data: string[]): Promise<void> {
  window.sessionStorage.setItem(prefix + tagCloudName, JSON.stringify(data))
}

// function uid() {
//   return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, '')
// }

class ApiSessionStorageTags implements ApiContractTags {
  async readAll(tagCloudName: string) {
    return JSON.parse(window.sessionStorage.getItem(prefix + tagCloudName) || '[]')
  }

  async create(tagCloudName: string, tagName: string): Promise<void> {
    const data = await this.readAll(tagCloudName)
    if (!data.includes(tagName)) data.push(tagName)
    setTags(tagCloudName, data)
  }

  async delete(tagCloudName: string, tagName: string): Promise<void> {
    const data = await this.readAll(tagCloudName)
    const filteredData = data.filter((e: string) => e !== tagName)
    setTags(tagCloudName, filteredData)
  }

  // // User management
  // async createUser(name?: string): Promise<string> {
  //   if (!name) name = ''
  //   const userId = uid() // TODO test uid is unique
  //   const newUser: User = { name, id: userId }
  //   window.sessionStorage.setItem(prefix + users, JSON.stringify(newUser))
  //   return userId
  // }
}

class ApiSessionStorage implements ApiContract {
  tags: ApiContractTags
  constructor() {
    this.tags = new ApiSessionStorageTags()
  }
}
export { ApiSessionStorage }
