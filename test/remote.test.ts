import { describe, expect, it } from 'vitest'
import getKairosConfig from '~/getkairos.config.json'
import { initAPI } from '~/remote/api'
import type { ApiContract } from '~/remote/apiContract'
import { TagCloudName } from '~/remote/apiContract'

const tagCloudName = TagCloudName.bookableTypes

function api_test(api: ApiContract, apiProvider: string) {
  describe(`Remote API: ${apiProvider}`, () => {
    it('can add and remove a tag', async() => {
      const initialData = await api.getAllTags(tagCloudName)
      const initialLength = initialData.length
      const additionalTag = 'test tag'

      await api.addTag(tagCloudName, additionalTag)
      let data = await api.getAllTags(tagCloudName)
      expect(data.includes(additionalTag)).to.eq(true)

      const incremented = data.length
      expect(initialLength).to.eq(incremented - 1)

      await api.deleteTag(tagCloudName, additionalTag)
      data = await api.getAllTags(tagCloudName)
      expect(data.includes(additionalTag)).to.eq(false)

      const cleanedLength = data.length
      expect(initialLength).to.greaterThanOrEqual(cleanedLength)

      // add same tag twice!
      await api.addTag(tagCloudName, additionalTag)
      await api.addTag(tagCloudName, additionalTag)
      await api.deleteTag(tagCloudName, additionalTag)
      data = await api.getAllTags(tagCloudName)
      expect(cleanedLength).to.eq(data.length)
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
