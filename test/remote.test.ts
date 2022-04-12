import { describe, expect, it } from 'vitest'

import { initAPI } from '~/remote/api'

const api = initAPI('session storage')

describe('Remote API', () => {
  it('can add and remove a bookable type', () => {
    const initial = api.getAllBookableTypes().length
    const additionaType = 'some type'

    api.addBookableType(additionaType)
    let data = api.getAllBookableTypes()
    expect(data.includes(additionaType)).to.eq(true)

    const incremented = data.length
    expect(initial).to.eq(incremented - 1)

    api.deleteBookableType(additionaType)
    data = api.getAllBookableTypes()
    expect(data.includes(additionaType)).to.eq(false)

    const final = data.length
    expect(initial).to.eq(final)
  })
})
