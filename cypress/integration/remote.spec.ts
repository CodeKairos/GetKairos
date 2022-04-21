import { TagCloudName } from '~/remote/ApiContract'
import { initAPI } from '~/remote/KairosApi'

const api = initAPI('session storage')
const tagCloudName = TagCloudName.bookableTypes

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
    const initial = (await api.tags.readAll(tagCloudName)).length
    const additionalType = 'some type'

    await api.tags.create(tagCloudName, additionalType)
    let data = await api.tags.readAll(tagCloudName)
    expect(data.includes(additionalType)).to.eq(true)

    const incremented = (await data).length
    expect(initial).to.eq(incremented - 1)

    await api.tags.delete(tagCloudName, additionalType)
    data = await api.tags.readAll(tagCloudName)
    expect(data.includes(additionalType)).to.eq(false)

    const final = data.length
    expect(initial).to.eq(final)
  })
})
