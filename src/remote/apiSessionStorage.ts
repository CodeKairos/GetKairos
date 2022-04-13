import type { ApiContract } from '~/remote/apiContract'
const bookableTypes = 'kairosBookableTypes'
async function setBookableTypes(data: string[]): Promise<void> {
  window.sessionStorage.setItem(bookableTypes, JSON.stringify(data))
}

class ApiSessionStorage implements ApiContract {
  async getAllBookableTypes() {
    return JSON.parse(window.sessionStorage.getItem(bookableTypes) || '[]')
  }

  async addBookableType(name: string): Promise<void> {
    const data = await this.getAllBookableTypes()
    data.push(name)
    setBookableTypes(data)
  }

  async deleteBookableType(name: string): Promise<void> {
    const data = await this.getAllBookableTypes()
    const filteredData = data.filter((e: string) => e !== name)
    setBookableTypes(filteredData)
  }
}
export { ApiSessionStorage }
