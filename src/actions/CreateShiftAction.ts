import { Action } from 'vuex';
import State from '@/models/State';
import * as ACTION from '@/types/ActionTypes';
import Shift from '@/models/Shift';

export const CreateShiftAction: Action<State, State> =
async ({ dispatch }, { userId, successorId, startTime, date }) => {
  await dispatch(ACTION.CREATE, new Shift({ userId, successorId, startTime, date, managerId: null }));
};
