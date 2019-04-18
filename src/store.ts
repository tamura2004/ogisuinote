import Vue from 'vue';
import Vuex from 'vuex';
import * as ACTION from '@/types/ActionTypes';
import { SET, SET_USER, SET_WAIT, SET_DATE } from '@/types/MutationTypes';
import State from '@/models/State';
import { db } from '@/plugins/firebase';
import moment from 'moment';
import _ from 'lodash';
import firebase from 'firebase/app';
import 'firebase/auth';
import User from './models/User';

const AUTH = firebase.auth();
AUTH.languageCode = 'ja';

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
      return state.users;
    },
    user(state, getters) {
      return (userId: string) => state.users.get(userId);
    },
    userName(state, getters) {
      return (userId: string) => {
        const user = getters.user(userId);
        return user ? `${user.familyName} ${user.givenName}` : 'ゲスト';
      }
    },
    userId(state) {
      return state.user && state.user.uid;
    },
    userIds(state) {
      return state.users.keys();
    },
    config(state) {
      return state.config.get('SF40rYUyFHPUjbRFVmue');
    },
    mailDomain(state, getters) {
      return getters.config && getters.config.mailDomain;
    },
    serverUrl(state, getters) {
      return getters.config && getters.config.serverUrl;
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
    async [ACTION.CREATE]({}, payload) {
      const conn = db.collection(payload.constructor.collectionName);
      const ref: any = await conn.add({...payload});
      return ref.id;
    },
    async [ACTION.UPDATE]({}, { collectionName, id, updates }) {
      await db.collection(collectionName).doc(id).update(updates);
    },
    async [ACTION.NEW]({}, { collectionName, id, data }) {
      await db.collection(collectionName).doc(id).set(data);
    },
    async [ACTION.DELETE]({}, { collectionName, id }) {
      await db.collection(collectionName).doc(id).delete();
    },
    async [ACTION.WAIT]({ commit }, cb) {
      try {
        commit(SET_WAIT, true);
        await cb();
      } catch (err) {
        alert(err);
      } finally {
        commit(SET_WAIT, false);
      }
    },
    [ACTION.TODAY]({ commit }) {
      commit(SET_DATE, moment().startOf('day').valueOf());
    },
    [ACTION.YESTERDAY]({ commit, state }) {
      commit(SET_DATE, moment(state.date).subtract(1, 'days').valueOf());
    },
    [ACTION.TOMORROW]({ commit, state }) {
      commit(SET_DATE, moment(state.date).add(1, 'days').valueOf());
    },
    async [ACTION.LOGOUT]({ commit, dispatch }) {
      await dispatch(
        ACTION.WAIT,
        async ()  => AUTH.signOut(),
      );
      commit(SET_USER, { user: null });
    },
    async [ACTION.SIGNUP]({ dispatch, getters }, { form, password }) {
      await dispatch(
        ACTION.WAIT,
        async () => {
          const { user } = await AUTH.createUserWithEmailAndPassword(
            form.email + getters.mailDomain,
            password,
          );
          if (user === null) {
            alert('fail to create user');
            return;
          }
          await user.updateProfile({
            displayName: form.familyName + ' ' + form.givenName,
          });
          await dispatch(ACTION.NEW_USER, { user, form });
        },
      );
    },
    async [ACTION.NEW_USER]({ dispatch, getters }, { user, form }) {
      await dispatch(
        ACTION.NEW,
        {
          collectionName: 'users',
          id: user.uid,
          data: {
            givenName: form.givenName,
            familyName: form.familyName,
            email: form.email + getters.mailDomain,
          },
        },
      );
    },
    async [ACTION.SIGNIN]({ dispatch, getters }, { email, password }) {
      await dispatch(
        ACTION.WAIT,
        async () => AUTH.signInWithEmailAndPassword(email + getters.mailDomain, password),
      );
    },
  },
});
