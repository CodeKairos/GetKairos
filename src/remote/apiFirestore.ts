import { initializeApp } from 'firebase/app'
import {
  addDoc, collection,
  deleteDoc, getDocs,
  getFirestore,
} from 'firebase/firestore'

import type { ApiContract } from '~/remote/apiContract'

// Import the functions you need from the SDKs you need
const bookableTypes = 'bookableTypes'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBmgvwdp7zRM852-jlXK0w1NpHYc61dWVU',
  authDomain: 'get-kairos.firebaseapp.com',
  projectId: 'get-kairos',
  storageBucket: 'get-kairos.appspot.com',
  messagingSenderId: '472968403828',
  appId: '1:472968403828:web:2b9bbafd95454b4b4dea21',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

class ApiFirestore implements ApiContract {
  async getAllBookableTypes() {
    const querySnapshot = await getDocs(collection(db, bookableTypes))
    const data: string[] = []
    querySnapshot.forEach((doc) => {
      data.push(doc.data().type)
    })
    return data
  }

  async addBookableType(name: string): Promise<void> {
    const postData = {
      type: name,
    }
    try {
      // const docRef =
      await addDoc(collection(db, bookableTypes), postData)
      // console.log('Document written with ID: ', docRef.id)
    }
    catch (e) {
      console.error('Error adding bookable type: ', e)
    }
  }

  async deleteBookableType(name: string): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, bookableTypes))
      querySnapshot.forEach(async(doc) => {
        if (doc.data().type === name)
          await deleteDoc(doc.ref)
      })
    }
    catch (e) {
      console.error('Error deleting bookable type: ', e)
    }
  }
}
export { ApiFirestore }
