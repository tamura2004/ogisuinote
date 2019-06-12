import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Store } from 'vuex';
import { SET, SET_USER } from '@/types/MutationTypes';
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
        type: SET_USER,
        user,
      });
    } else {
      store.commit({
        type: SET_USER,
        user: null,
      });
    }
  });
}

export function listen<T>(
  store: Store<State>,
  fn: (new(init: any) => T) & { collectionName: string },
  date?: number,
  keyName?: string,
  key?: string,
) {
  const name = fn.collectionName;
  const dbRef = db.collection(name);
  let query = date ? dbRef.where('date', '>=', date) : dbRef;
  if (keyName && key) {
    query = query.where(keyName, '==', key);
  }
  const unsubscribe = query.onSnapshot((queryRef: any) => {
    const map = new Map<string, T>();
    queryRef.forEach((doc: any) => {
      map.set(doc.id, new fn({...doc.data()}));
    });
    store.commit({
      type: SET,
      name,
      map,
    });
  });
  return unsubscribe;
}
