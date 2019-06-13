import { SET_WAIT } from '@/types/MutationTypes';
import { Action } from 'vuex';
import State from '@/models/State';

export const WaitAction: Action<State, State> = async ({ commit }, cb) => {
  try {
    commit(SET_WAIT, true);
    await cb();
  } catch (err) {
    alert(err);
  } finally {
    commit(SET_WAIT, false);
  }
};
