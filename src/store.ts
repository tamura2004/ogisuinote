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
import Shift from './models/Shift';
import Overwork from './models/Overwork';

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
    user(state) {
      return (userId: string) => state.users.get(userId);
    },
    userName(state, getters) {
      return (userId: string) => {
        const user = getters.user(userId);
        return !!user ? user.name : 'ゲスト';
      };
    },
    userId(state) {
      return state.user && state.user.uid;
    },
    currentUser(state, getters) {
      return getters.user(getters.userId);
    },
    userIds(state) {
      return [...state.users.keys()];
    },
    config(state) {
      return state.config;
    },
    mailDomain(state, getters) {
      return getters.config && getters.config.mailDomain;
    },
    serverUrl(state, getters) {
      return getters.config && getters.config.serverUrl;
    },
    hasShift(state) {
      return (userId: string, date: number) =>
        [...state.shifts].find(([id, shift]) => shift.userId === userId && shift.date === date);
    },
    shiftId(state, getters) {
      return (userId: string, date: number) =>
      getters.hasShift(userId, date) && getters.hasShift(userId, date)[0];
    },
    shift(state, getters) {
      return (userId: string, date: number) =>
      getters.hasShift(userId, date) && getters.hasShift(userId, date)[1];
    },
    hasOverwork(state) {
      return (userId: string, date: number) =>
        [...state.overworks].find(([id, overwork]) => overwork.userId === userId && overwork.date === date);
    },
    overworkId(state, getters) {
      return (userId: string, date: number) =>
        getters.hasOverwork(userId, date) && getters.hasOverwork(userId, date)[0];
    },
    overwork(state, getters) {
      return (userId: string, date: number) =>
        getters.hasOverwork(userId, date) && getters.hasOverwork(userId, date)[1];
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
    async [ACTION.NEW]({}, { id, payload }) {
      const conn = db.collection(payload.constructor.collectionName);
      await conn.doc(id).set({...payload});
    },
    async [ACTION.UPDATE]({}, { collectionName, id, updates }) {
      await db.collection(collectionName).doc(id).update(updates);
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
    async [ACTION.SIGNUP]({ dispatch }, { email, password, name, manager }) {
      const { user } = await AUTH.createUserWithEmailAndPassword(email, password);
      if (user === null) {
        alert('fail to create user');
        return;
      }
      await dispatch(ACTION.PROFILE_UPDATE, { user, name });
      const id = user.uid;
      await dispatch(ACTION.NEW_USER, { id, name, email, manager });
    },
    async [ACTION.PROFILE_UPDATE]({}, { user, name }) {
      user.updateProfile({ displayName: name });
    },
    async [ACTION.NEW_USER]({ dispatch }, { id, name, email, manager }) {
      const payload = new User({ name, email, manager });
      await dispatch(ACTION.NEW, { id, payload });
    },
    async [ACTION.UPDATE_USER]({ dispatch, state }, { userId, name }) {
      await dispatch(ACTION.UPDATE, {
        collectionName: 'users',
        id: userId,
        updates: { name },
      });
      await dispatch(ACTION.PROFILE_UPDATE, {
        user: state.user,
        name,
      });
    },
    async [ACTION.SIGNIN]({ dispatch, getters }, { email, password }) {
      const { user } = await AUTH.signInWithEmailAndPassword(email, password);
      if (user === null) {
        return;
      }
      if (!getters.user(user.uid)) {
        const id = user.uid;
        const name = user.displayName;
        dispatch(ACTION.NEW_USER, { id, name, email });
      }
    },
    async [ACTION.PASSWORD_RESET]({}, { email }) {
      AUTH.sendPasswordResetEmail(email);
    },
    async [ACTION.CREATE_SHIFT]({ dispatch }, { userId, successorId, startTime, date }) {
      await dispatch(ACTION.CREATE, new Shift({ userId, successorId, startTime, date, managerId: null }));
    },
    async [ACTION.ALLOW_SHIFT]({ dispatch }, { shiftId, managerId }) {
      await dispatch(ACTION.UPDATE, {
        collectionName: 'shifts',
        id: shiftId,
        updates: {
          managerId,
        },
      });
    },
    async [ACTION.ALLOW_OVERWORK]({ dispatch }, { userId, date, managerId }) {
      await dispatch(ACTION.CREATE, new Overwork({ userId, date, managerId }));
    },
    [ACTION.UPDATE_TASK]({ dispatch }, { taskId, updates }) {
      dispatch(ACTION.UPDATE, {
        collectionName: 'tasks',
        id: taskId,
        updates,
      });
    },
    [ACTION.UPDATE_TASK_PRIORITY]({ dispatch }, { priority, taskId }) {
      dispatch(ACTION.UPDATE_TASK, { taskId, updates: { priority } });
    },
    [ACTION.UPDATE_TASK_PLAN]({ dispatch }, { plan, taskId }) {
      dispatch(ACTION.UPDATE_TASK, { taskId, updates: { plan } });
    },
    [ACTION.UPDATE_TASK_ACTUAL]({ dispatch }, { actual, taskId }) {
      dispatch(ACTION.UPDATE_TASK, { taskId, updates: { actual } });
    },
    [ACTION.UPDATE_TASK_MEMO]({ dispatch }, { memo, taskId }) {
      dispatch(ACTION.UPDATE_TASK, { taskId, updates: { memo } });
    },
  },
});
