import { initAPI } from '~/remote/api'
const api = initAPI('session storage')

context('Remote API', () => {
  // beforeEach(() => {
  //   cy.visit('/')
  // })

  // before(() => {
  // })

  // it('can add numbers', () => {
  //   expect(add(1, 2)).to.eq(3)
  // })

  it('is empty', () => {
    api.addBookableType('some type')
    api.deleteAllBookableTypes()
    const data = api.getAllBookableTypes()
    expect(data.length).to.eq(0)
  })
})
