import { Action } from 'vuex';
import State from '@/models/State';
import * as ACTION from '@/types/ActionTypes';
import Overwork from '@/models/Overwork';

export const AllowOverworkAction: Action<State, State> = async ({ dispatch }, { userId, date, managerId }) => {
  await dispatch(ACTION.CREATE, new Overwork({ userId, date, managerId }));
};
