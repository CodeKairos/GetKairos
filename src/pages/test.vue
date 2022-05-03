<!-- https://github.com/quasarframework/quasar-ui-qcalendar/blob/next/docs/src/examples/ResourceChildren.vue -->
<script setup lang="ts">
/* eslint-disable no-console */
import { QCalendarResource, today } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarResource.sass'

import { initAPI } from '~/remote/KairosApi'
import type { BookableItem, BookingEvent } from '~/remote/ApiContract'
import { TagCloudName } from '~/remote/ApiContract'
import getKairosConfig from '~/getkairos.config.json'

const jsonServerBaseURL = process.env.NODE_ENV === 'development'
  ? getKairosConfig.devJsonServerBaseURL
  : getKairosConfig.jsonServerBaseURL

console.log('using json-server from ', jsonServerBaseURL)
const api = initAPI(
  getKairosConfig.apiProvider,
  jsonServerBaseURL,
)

const bookingType = ref('')

async function testAPI() {
  const initialTypes = await api.tags.readAll(TagCloudName.bookableTypes)
  console.log('before:', initialTypes)
  await api.tags.create(TagCloudName.bookableTypes, 'test11')
  await api.tags.create(TagCloudName.bookableTypes, 'some type3')
  await api.tags.delete(TagCloudName.bookableTypes, 'some type3')
  console.log('after:',
    await api.tags.readAll(TagCloudName.bookableTypes))
  await api.tags.delete(TagCloudName.bookableTypes, 'test11')
  console.log('after2:',
    await api.tags.readAll(TagCloudName.bookableTypes))

  let a = await api.bookableItems.readAll()
  console.log('bookableItems init ->', a)
  const p: BookableItem|undefined = await api.bookableItems.create({ name: 'Jupyter', type: 'meeting room' })
  console.log('bookableItems new item: ', p)
  a = await api.bookableItems.readAll()
  console.log('bookableItems create ->', a)
  if (p !== undefined) {
    await api.bookableItems.delete(p.id)
    a = await api.bookableItems.readAll()
    console.log('bookableItems delete ->', a)
  }

  let b = await api.bookingEvents.readAll()
  console.log('bookingEvents init ->', b)
  const bp: BookingEvent|undefined = await api.bookingEvents.create({ bookableItemId: 'test12', start: '123', end: '123', creatorId: '213' })
  console.log('bookingEvents new item: ', bp)
  b = await api.bookingEvents.readAll()
  console.log('bookingEvents create ->', b)
  if (bp !== undefined) {
    await api.bookingEvents.delete(bp.id)
    b = await api.bookingEvents.readAll()
    console.log('bookingEvents delete ->', b)
  }
}

onMounted(async() => {
  bookingType.value = JSON.stringify(await api.tags.readAll(TagCloudName.bookableTypes))
  testAPI()
})

const selectedDate = ref(today())
const resources = ref([
  { id: '1', name: 'John' },
  {
    id: '2',
    name: 'Board Room',
    expanded: false,
    children: [
      { id: '2.1', name: 'Room-1' },
      {
        id: '2.2',
        name: 'Room-2',
        expanded: false,
        children: [
          { id: '2.2.1', name: 'Partition-A' },
          { id: '2.2.2', name: 'Partition-B' },
          { id: '2.2.3', name: 'Partition-C' },
        ],
      },
    ],
  },
  { id: '3', name: 'Mary' },
  { id: '4', name: 'Susan' },
  { id: '5', name: 'Olivia' },
])

</script>
<template>
  Response:  {{ bookingType }}
  <br>
  <!-- result: {{ result }} -->
  <div class="row justify-center">
    <div style="display: flex; max-width: 800px; width: 100%; height: 400px;">
      <q-calendar-resource
        ref="calendar"
        v-model="selectedDate"
        v-model:model-resources="resources"
        resource-key="id"
        resource-label="name"
        bordered
      />
    </div>
  </div>
</template>
