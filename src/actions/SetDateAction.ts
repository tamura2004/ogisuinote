import { Action } from 'vuex';
import { SET_DATE } from '@/types/MutationTypes';
import { db } from '@/plugins/firebase';
import * as ACTION from '@/types/ActionTypes';
import State from '@/models/State';
import Overwork from '@/models/Overwork';
import Shift from '@/models/Shift';

export const SetDateAction: Action<State, State> = async ({ commit, dispatch }, date) => {
  commit(SET_DATE, date);
  dispatch(ACTION.LISTEN, {
    query: db.collection('overworks').where('date', '==', date),
    name: 'overworks',
    klass: Overwork,
  });
  dispatch(ACTION.LISTEN, {
    query: db.collection('shifts').where('date', '==', date),
    name: 'shifts',
    klass: Shift,
  });
};
