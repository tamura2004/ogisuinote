import { Action } from 'vuex';
import State from '@/models/State';
import * as ACTION from '@/types/ActionTypes';

export const UpdateTaskMemoAction: Action<State, State> = async ({ dispatch }, { memo, taskId }) => {
  dispatch(ACTION.UPDATE_TASK, { taskId, updates: { memo } });
};
