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

  it('can add and remove a bookable type', async() => {
    const initial = (await api.getAllBookableTypes()).length
    const additionaType = 'some type'

    api.addBookableType(additionaType)
    let data = api.getAllBookableTypes()
    expect((await data).includes(additionaType)).to.eq(true)

    const incremented = (await data).length
    expect(initial).to.eq(incremented - 1)

    api.deleteBookableType(additionaType)
    data = api.getAllBookableTypes()
    expect((await data).includes(additionaType)).to.eq(false)

    const final = (await data).length
    expect(initial).to.eq(final)
  })
})
