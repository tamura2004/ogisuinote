import { SET } from '@/types/MutationTypes';
import { Action } from 'vuex';
import State from '@/models/State';

export const ListenAction: Action<State, State> = ({ commit }, { query, name, klass }) => {
  const unsubscribe = query.onSnapshot((queryRef: any) => {
    const map = new Map();
    queryRef.forEach((doc: any) => {
      map.set(doc.id, new klass({...doc.data()}));
    });
    commit(SET, { name, map });
  });
  return unsubscribe;
};
