import { Action } from 'vuex';
import State from '@/models/State';
import * as ACTION from '@/types/ActionTypes';

export const UpdateTaskPriorityAction: Action<State, State> = async ({ dispatch }, { priority, taskId }) => {
  dispatch(ACTION.UPDATE_TASK, { taskId, updates: { priority } });
};
