import type { ApiContract, TagsApi } from '~/remote/apiContract'
const prefix = 'kairos-'
async function setTags(tagCloudName: string, data: string[]): Promise<void> {
  window.sessionStorage.setItem(prefix + tagCloudName, JSON.stringify(data))
}

class TagsSessionStorage implements TagsApi {
  async readAll(tagCloudName: string) {
    return JSON.parse(window.sessionStorage.getItem(prefix + tagCloudName) || '[]')
  }

  async create(tagCloudName: string, tagName: string): Promise<void> {
    const data = await this.readAll(tagCloudName)
    data.push(tagName)
    setTags(tagCloudName, data)
  }

  async delete(tagCloudName: string, tagName: string): Promise<void> {
    const data = await this.readAll(tagCloudName)
    const filteredData = data.filter((e: string) => e !== tagName)
    setTags(tagCloudName, filteredData)
  }
}

class ApiSessionStorage implements ApiContract {
  tags: TagsApi
  constructor() {
    this.tags = new TagsSessionStorage()
  }
}
export { ApiSessionStorage }
