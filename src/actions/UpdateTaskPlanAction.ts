import { Action } from 'vuex';
import State from '@/models/State';
import * as ACTION from '@/types/ActionTypes';

export const UpdateTaskPlanAction: Action<State, State> = async ({ dispatch }, { plan, taskId }) => {
  dispatch(ACTION.UPDATE_TASK, { taskId, updates: { plan } });
};
