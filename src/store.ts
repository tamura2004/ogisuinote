import Vue from 'vue';
import Vuex from 'vuex';
import Task from '@/models/Task';
import { CREATE, UPDATE, DELETE, WAIT, TODAY, YESTERDAY, TOMORROW } from '@/types/ActionTypes';
import { SET, SET_USER, SET_WAIT, SET_DATE } from '@/types/MutationTypes';
import State from '@/models/State';
import { db } from '@/plugins/firebase';
import moment from 'moment';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: new State(),
  getters: {
    tasks(state) {
      return (userId: string, date: number) => [...state.tasks]
        .filter(([, task]) => task.userId === userId && task.date === date);
    },
    task(state) {
      return (taskId: string) => state.tasks.get(taskId);
    },
    date(state) {
      return state.date;
    },
    users(state) {
      return _.uniq([...state.tasks].map(([, task]) => task.userId));
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
    [SET_DATE](state, payload) {
      state.date = payload;
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
    async [WAIT]({ commit }, cb) {
      try {
        commit(SET_WAIT, true);
        await cb();
      } catch (err) {
        alert(err);
      } finally {
        commit(SET_WAIT, false);
      }
    },
    [TODAY]({ commit }) {
      commit(SET_DATE, moment().startOf('day').valueOf());
    },
    [YESTERDAY]({ commit, state }) {
      commit(SET_DATE, moment(state.date).subtract(1, 'days').valueOf());
    },
    [TOMORROW]({ commit, state }) {
      commit(SET_DATE, moment(state.date).add(1, 'days').valueOf());
    },
  },
});
