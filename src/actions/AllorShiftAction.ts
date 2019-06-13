import { Action } from 'vuex';
import State from '@/models/State';
import * as ACTION from '@/types/ActionTypes';

export const AllowShiftAction: Action<State, State> = async ({ dispatch }, { shiftId, managerId }) => {
  await dispatch(ACTION.UPDATE, {
    collectionName: 'shifts',
    id: shiftId,
    updates: {
      managerId,
    },
  });
};
