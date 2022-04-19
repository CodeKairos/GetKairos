<!-- https://github.com/quasarframework/quasar-ui-qcalendar/blob/next/docs/src/examples/ResourceChildren.vue -->
<script setup lang="ts">
/* eslint-disable no-console */
import { QCalendarResource, today } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarResource.sass'

import { initAPI } from '~/remote/api'
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
  const initialTypes = await api.getAllBookableTypes()
  console.log('before:', initialTypes)
  await api.addBookableType('test11')
  await api.addBookableType('some type3')
  await api.deleteBookableType('some type3')
  console.log('after:',
    await api.getAllBookableTypes())
  await api.deleteBookableType('test11')
  console.log('after2:',
    await api.getAllBookableTypes())
}

onMounted(async() => {
  bookingType.value = JSON.stringify(await api.getAllBookableTypes())
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
