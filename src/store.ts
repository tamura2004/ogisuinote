import Vue from 'vue';
import Vuex from 'vuex';
import { SET, SET_USER, SET_WAIT, SET_DATE } from '@/types/MutationTypes';
import State from '@/models/State';
import _ from 'lodash';
import firebase from 'firebase/app';
import 'firebase/auth';
import { toTime } from '@/plugins/datetimeUtil';
import Task from '@/models/Task';
import actions from '@/actions';

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
    plan(state, getters) {
      return (userId: string, date: number) => {
        const tasks: Array<[string, Task]> = getters.tasks(userId, date);
        return tasks
          .map(([, task]) => task.plan)
          .reduce((a, plan) => a + plan, 0);
      };
    },
    overworkTime(state, getters) {
      return (userId: string, date: number) => {
        const plan = getters.plan(userId, date);
        return plan < 7.5 ? 0 : plan - 7.5;

      };
    },
    lastTime(state, getters) {
      return (userId: string, date: number) => {
        const shift = getters.shift(userId, date);
        const overworkTime = getters.overworkTime(userId, date);
        if (!!shift) {
          return toTime(shift.startTime + (8.5 + overworkTime) * 60);
        } else {
          return toTime(17 * 60 + 10 + overworkTime * 60);
        }
      };
    },
    onTimeByMinute(state, getters) {
      return (userId: string, date: number) => {
        const shift = getters.shift(userId, date);
        return shift ? shift.startTime + 510 : 1030;
      };
    },
    lastTimeByMinute(state, getters) {
      return (userId: string, date: number) => {
        const onTimeByMinute = getters.onTimeByMinute(userId, date);
        const overworkTime = getters.overworkTime(userId, date);
        return onTimeByMinute + overworkTime * 60;
      };
    },
    startTime(state, getters) {
      return (userId: string, date: number) => {
        const shift = getters.shift(userId, date);
        if (!!shift) {
          return toTime(shift.startTime);
        } else {
          return '8時40分';
        }
      };
    },
    startTimeByMinute(state, getters) {
      return (userId: string, date: number) => {
        const shift = getters.shift(userId, date);
        return shift ? shift.startTime : 520;
      };
    },
    successorName(state, getters) {
      return (userId: string, date: number) => {
        const shift = getters.shift(userId, date);
        if (!shift) {
          return '-';
        }
        const successor = getters.user(shift.successorId);
        return successor ? successor.name : '-';
      };
    },
    owner(state, getters) {
      return (userId: string) => {
        return userId === getters.userId;
      };
    },
  },
  mutations: {
    [SET](state, { name, map }) {
      Vue.set(state, name, map);
    },
    [SET_USER](state, { user }) {
      if (user === null) {
        state.user = null;
      } else {
        const {uid, displayName, email} = user;
        state.user = {uid, displayName, email};
      }
    },
    [SET_WAIT](state, payload) {
      state.wait = payload;
    },
    [SET_DATE](state, payload) {
      state.date = payload;
    },
  },
  actions,
});
