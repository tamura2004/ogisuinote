import { Action } from 'vuex';
import State from '@/models/State';
import * as ACTION from '@/types/ActionTypes';

export const UpdateUserAction: Action<State, State> = async ({ dispatch, state }, { userId, name }) => {
  await dispatch(ACTION.UPDATE, {
    collectionName: 'users',
    id: userId,
    updates: { name },
  });
  await dispatch(ACTION.PROFILE_UPDATE, {
    user: state.user,
    name,
  });
};
