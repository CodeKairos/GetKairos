import type { ApiContract } from '~/remote/apiContract'
const bookableTypes = 'getKairosBookableTypes'
function setBookableTypes(data: string[]): void {
  window.sessionStorage.setItem(bookableTypes, JSON.stringify(data))
}

class ApiSessionStorage implements ApiContract {
  name = 'session storage'
  getAllBookableTypes() {
    return JSON.parse(window.sessionStorage.getItem(bookableTypes) || '[]')
  }

  addBookableType(name: string): void {
    const data = this.getAllBookableTypes()
    data.push(name)
    setBookableTypes(data)
  }

  deleteAllBookableTypes(): void {
    window.sessionStorage.removeItem(bookableTypes)
  }

  deleteBookableType(name: string): void {
    const data = this.getAllBookableTypes()
    const filteredData = data.filter((e: string) => e !== name)
    setBookableTypes(filteredData)
  }
}
export { ApiSessionStorage }
