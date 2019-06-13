import { Action } from 'vuex';
import State from '@/models/State';
import * as ACTION from '@/types/ActionTypes';

export const UpdateTaskAction: Action<State, State> = async ({ dispatch }, { taskId, updates }) => {
  dispatch(ACTION.UPDATE, {
    collectionName: 'tasks',
    id: taskId,
    updates,
  });
};
