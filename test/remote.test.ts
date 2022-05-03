import { describe, expect, it } from 'vitest'
import getKairosConfig from '~/getkairos.config.json'
import { initAPI } from '~/remote/KairosApi'
import type { ApiContract, BookableItemBase, BookingEventBase } from '~/remote/ApiContract'
import { TagCloudName } from '~/remote/ApiContractTags'

const tagCloudName = TagCloudName.bookableTypes

function api_test_tags(api: ApiContract, apiProvider: string) {
  describe(`Remote API test tags: ${apiProvider}`, () => {
    it('can add and remove a tag', async() => {
      const additionalTag = 'test tag'

      // clean up
      await api.tags.delete(tagCloudName, additionalTag)

      const initialData = await api.tags.readAll(tagCloudName)
      const initialLength = initialData.length
      expect(initialData.includes(additionalTag)).to.eq(false)

      await api.tags.create(tagCloudName, additionalTag)
      let data = await api.tags.readAll(tagCloudName)
      expect(data.includes(additionalTag)).to.eq(true)

      const incremented = data.length
      expect(initialLength).to.eq(incremented - 1)

      await api.tags.delete(tagCloudName, additionalTag)
      data = await api.tags.readAll(tagCloudName)
      expect(data.includes(additionalTag)).to.eq(false)

      const cleanedLength = data.length
      expect(initialLength).to.eq(cleanedLength)
    }, 125000)

    it('does not create duplicated tags', async() => {
      const additionalTag = 'test tag'
      // clean up
      await api.tags.delete(tagCloudName, additionalTag)
      const cleanedLength = (await api.tags.readAll(tagCloudName)).length

      // add same tag twice!
      await api.tags.create(tagCloudName, additionalTag)
      await api.tags.create(tagCloudName, additionalTag)
      let data = await api.tags.readAll(tagCloudName)
      expect(cleanedLength).to.eq(data.length - 1)
      await api.tags.delete(tagCloudName, additionalTag)
      data = await api.tags.readAll(tagCloudName)
      expect(cleanedLength).to.eq(data.length)
    })

    it('can use all tag clouds', async() => {
      for (const tagCloudName in TagCloudName) {
        const additionalTag = 'test tag'
        await api.tags.create(tagCloudName, additionalTag)
        const data = await api.tags.readAll(tagCloudName)
        expect(data.includes(additionalTag)).to.eq(true)
        await api.tags.delete(tagCloudName, additionalTag)
      }
    }, 10000)

    // it(' CRUD user', async() => {
    //   const newUserName = 'test user'
    //   const userId = await api.createUser(newUserName)
    //   const createdUser = await api.getUserById(userId)
    //   expect(createdUser.name).to.eq(newUserName)
    //   await api.deleteUser(userId)
    // })
  })
}

function api_test_items_and_events(api: ApiContract, apiProvider: string) {
  describe(`Remote API test bookable items: ${apiProvider}`, () => {
    it('can add and remove a bookable items', async() => {
      const item: BookableItemBase = { name: 'test name', type: 'test type', tags: ['tag1', 'tag2'], photos: ['test/photo.png'], icon: 'test/icon.png', relatedProps: [{ seats: 2 }] }

      const initialData = await api.bookableItems.readAll()
      const initialLength = initialData.length

      const newItem = await api.bookableItems.create(item)
      expect(newItem === undefined).to.eq(false)
      if (newItem !== undefined) {
        let data = await api.bookableItems.readAll()
        expect(data.some(x => x.id === newItem.id)).to.eq(true)

        const incremented = data.length
        expect(initialLength).to.eq(incremented - 1)

        await api.bookableItems.delete(newItem.id)
        data = await api.bookableItems.readAll()
        expect(data.some(x => x.id === newItem.id)).to.eq(false)

        const cleanedLength = data.length
        expect(initialLength).to.eq(cleanedLength)
      }
    }, 125000)
  })
  describe(`Remote API test bookable items: ${apiProvider}`, () => {
    it('can add and remove a bookable events', async() => {
      const item: BookingEventBase = { bookableItemId: 'test12', start: '123', end: '123', creatorId: '213' }

      const initialData = await api.bookingEvents.readAll()
      const initialLength = initialData.length

      const newItem = await api.bookingEvents.create(item)
      expect(newItem === undefined).to.eq(false)
      if (newItem !== undefined) {
        let data = await api.bookingEvents.readAll()
        expect(data.some(x => x.id === newItem.id)).to.eq(true)

        const incremented = data.length
        expect(initialLength).to.eq(incremented - 1)

        await api.bookingEvents.delete(newItem.id)
        data = await api.bookingEvents.readAll()
        expect(data.some(x => x.id === newItem.id)).to.eq(false)

        const cleanedLength = data.length
        expect(initialLength).to.eq(cleanedLength)
      }
    }, 125000)
  })
}

for (const apiProvider of getKairosConfig.testApiProviders) {
  if (apiProvider === 'json-server') {
    const api = initAPI(apiProvider, getKairosConfig.testJsonServerBaseURL)
    api_test_tags(api, apiProvider)
    api_test_items_and_events(api, apiProvider)
  }
  else if (apiProvider === 'firestore') {
    const api = initAPI(apiProvider, getKairosConfig.testJsonServerBaseURL)
    api_test_tags(api, apiProvider)
    api_test_items_and_events(api, apiProvider)
  }
  else {
    const api = initAPI(apiProvider)
    api_test_tags(api, apiProvider)
    api_test_items_and_events(api, apiProvider)
  }
}
