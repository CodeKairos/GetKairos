<!-- https://github.com/quasarframework/quasar-ui-qcalendar/blob/next/docs/src/examples/ResourceChildren.vue -->
<script setup lang="ts">
/* eslint-disable no-console */
import { QCalendarResource, today } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarResource.sass'
import axios from 'axios'
import { initAPI } from '~/remote/api'
import getKairosConfig from '~/getkairos.config.json'

const http = axios.create({
  baseURL: getKairosConfig.jsonServerBaseURL,
  headers: {
    'Content-type': 'application/json',
  },
})
const bookingType = ref('')

const api = initAPI(getKairosConfig.apiProvider)
// api.deleteAllBookableTypes()
console.log(api.getAllBookableTypes())
api.addBookableType('test11')
api.addBookableType('test1')
api.deleteBookableType('test1')
console.log(api.getAllBookableTypes())
api.deleteBookableType('test11')

// const postData = {
//   title: 'post title',
//   description: 'some data',
// }

// const res = await http.post('/posts', postData)
// const result = ref({
//   status: `${res.status}-${res.statusText}`,
//   headers: res.headers,
//   data: res.data,
// })
// http.post('/posts')

http.get('/posts')
  .then((response) => {
    bookingType.value = response.data
  })
  .catch((e) => {
  })

// [
//   {
//     "id": 0,
//     "title": "First post!",
//     "content": "My first content!"
//   }
// ]
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
