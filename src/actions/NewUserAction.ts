import { Action } from 'vuex';
import State from '@/models/State';
import User from '@/models/User';
import * as ACTION from '@/types/ActionTypes';

export const NewUserAction: Action<State, State> = async ({ dispatch }, { id, name, email, manager }) => {
  const payload = new User({ name, email, manager });
  await dispatch(ACTION.NEW, { id, payload });
};
