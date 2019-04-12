import Vue from 'vue';
import Vuex from 'vuex';
import Task from '@/models/Task';
import { CREATE, UPDATE, DELETE } from '@/types/ActionTypes';
import State from '@/models/State';
import { db } from '@/plugins/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: new State(),
  getters: {
    tasks(state) {
      return (userId: string, date: number) => new Map<string, Task>(
        [...state.tasks]
        .filter(([, e]) => e.userId === userId && e.date === date),
      );
    },
    task(state) {
      return (taskId: string) => state.tasks.get(taskId);
    },
  },
  mutations: {
    set(state, { name, collection }) {
      Vue.set(state, name, collection);
    },
    setUser(state, { user }) {
      state.user = user;
    }
  },
  actions: {
    async [CREATE]({}, payload) {
      const conn = db.collection(payload.constructor.collectionName);
      const ref: any = await conn.add({...payload});
      return ref.id;
    },
    async [UPDATE]({}, { collectionName, id, updates }) {
      await db.collection(collectionName).doc(id).update(updates);
    },
    async [DELETE]({}, { collectionName, id }) {
      await db.collection(collectionName).doc(id).delete();
    },
  },
});
