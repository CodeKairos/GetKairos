import { describe, expect, it } from 'vitest'
import getKairosConfig from '~/getkairos.config.json'
import { initAPI } from '~/remote/api'
import type { ApiContract } from '~/remote/apiContract'

function api_test(api: ApiContract, apiProvider: string) {
  describe(`Remote API: ${apiProvider}`, () => {
    it('can add and remove a bookable type', async() => {
      const initialData = await api.getAllBookableTypes()
      const initial = initialData.length
      const additionaType = 'some type3'

      await api.addBookableType(additionaType)
      let data = await api.getAllBookableTypes()
      expect(data.includes(additionaType)).to.eq(true)

      const incremented = data.length
      expect(initial).to.eq(incremented - 1)

      await api.deleteBookableType(additionaType)
      data = await api.getAllBookableTypes()
      expect(data.includes(additionaType)).to.eq(false)

      const finalClean = data.length
      expect(initial).to.greaterThanOrEqual(finalClean)

      await api.addBookableType(additionaType)
      await api.deleteBookableType(additionaType)
      data = await api.getAllBookableTypes()
      const final = data.length
      expect(finalClean).to.eq(final)
    }, 125000)
  })
}

for (const apiProvider of getKairosConfig.testApiProviders) {
  if (apiProvider === 'json-server') {
    const api = initAPI(apiProvider, getKairosConfig.testJsonServerBaseURL)
    api_test(api, apiProvider)
  }
  else if (apiProvider === 'firestore') {
    const api = initAPI(apiProvider, getKairosConfig.testJsonServerBaseURL)
    api_test(api, apiProvider)
  }
  else {
    const api = initAPI(apiProvider)
    api_test(api, apiProvider)
  }
}
