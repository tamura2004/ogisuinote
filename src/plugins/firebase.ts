import 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Store } from 'vuex';
import { SET, SET_USER } from '@/types/MutationTypes';
import State from '@/models/State';
import _ from 'lodash';
import moment from 'moment';

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
  getMap: () => Map<string, T>,
) {
  const name = fn.collectionName;
  const ref = db.collection(name);
  const limit = moment().startOf('day').subtract(2, 'days').valueOf();
  const collection = name === 'users' ? ref : ref.where('date', '>=', limit);
  collection.onSnapshot((query) => {
    const map = _.cloneDeep(getMap());
    query.docChanges().forEach((change: any) => {
      if (change.type === 'added' || change.type === 'modified') {
        map.set(change.doc.id, new fn({...change.doc.data()}));
      }
    });
    store.commit({
      type: SET,
      name,
      map,
    });
  });
}
