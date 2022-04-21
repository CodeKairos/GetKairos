import type {
  ApiContract,
  //  User
} from '~/remote/apiContract'
const prefix = 'kairos-'
// const users = 'users'
async function setTags(tagCloudName: string, data: string[]): Promise<void> {
  window.sessionStorage.setItem(prefix + tagCloudName, JSON.stringify(data))
}

// function uid() {
//   return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, '')
// }

class ApiSessionStorage implements ApiContract {
  // Tags management
  async getAllTags(tagCloudName: string) {
    return JSON.parse(window.sessionStorage.getItem(prefix + tagCloudName) || '[]')
  }

  async addTag(tagCloudName: string, tagName: string): Promise<void> {
    const data = await this.getAllTags(tagCloudName)
    data.push(tagName)
    setTags(tagCloudName, data)
  }

  async deleteTag(tagCloudName: string, tagName: string): Promise<void> {
    const data = await this.getAllTags(tagCloudName)
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
export { ApiSessionStorage }
