import 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Store } from 'vuex';

import State from '@/models/State';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBS7SMT8WMvzVCVrlNDuIPbAarPMB8FiG4',
  authDomain: 'ogisuinote.firebaseapp.com',
  databaseURL: 'https://ogisuinote.firebaseio.com',
  projectId: 'ogisuinote',
  storageBucket: 'ogisuinote.appspot.com',
  messagingSenderId: '1029581920752',
});

export const db = firebaseApp.firestore();

export function listenUser(store: Store<State>) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit({
        type: 'setUser',
        user,
      });
    }
  });
}

export function listen<T>(
  store: Store<State>,
  fn: (new(init: Partial<T>) => T) & { collectionName: string },
) {
  const name = fn.collectionName;
  db.collection(name).onSnapshot((query) => {
    const collection = new Map<string, T>();
    query.forEach((doc: any) => {
      collection.set(doc.id, new fn({...doc.data()}));
    });
    store.commit({
      type: 'set',
      name,
      collection,
    });
  });
}
