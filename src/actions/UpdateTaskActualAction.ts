import { Action } from 'vuex';
import State from '@/models/State';
import * as ACTION from '@/types/ActionTypes';

export const UpdateTaskActualAction: Action<State, State> = async ({ dispatch }, { actual, taskId }) => {
  dispatch(ACTION.UPDATE_TASK, { taskId, updates: { actual } });
};
