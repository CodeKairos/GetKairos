import type { ApiContract } from '~/remote/apiContract'
const prefix = 'kairos-'
async function setTags(tagCloudName: string, data: string[]): Promise<void> {
  window.sessionStorage.setItem(prefix + tagCloudName, JSON.stringify(data))
}

class ApiSessionStorage implements ApiContract {
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
}
export { ApiSessionStorage }
