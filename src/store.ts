import Vue from 'vue';
import Vuex from 'vuex';
import Task from '@/models/Task';
import { CREATE, UPDATE, DELETE, WAIT } from '@/types/ActionTypes';
import { SET, SET_USER, SET_WAIT } from '@/types/MutationTypes';
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
    [SET](state, { name, collection }) {
      Vue.set(state, name, collection);
    },
    [SET_USER](state, payload) {
      state.user = payload.user;
    },
    [SET_WAIT](state, payload) {
      state.wait = payload;
    },
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
    async [WAIT]({commit}, cb) {
      try {
        commit(SET_WAIT, true);
        await cb();
      } catch (err) {
        alert(err);
      } finally {
        commit(SET_WAIT, false);
      }
    },
  },
});
