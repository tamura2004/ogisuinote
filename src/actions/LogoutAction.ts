import { Action } from 'vuex';
import State from '@/models/State';
import * as ACTION from '@/types/ActionTypes';
import firebase from 'firebase/app';
import 'firebase/auth';
import { SET_USER } from '@/types/MutationTypes';

export const LogoutAction: Action<State, State> = async ({ commit, dispatch }) => {
  const AUTH = firebase.auth();
  AUTH.languageCode = 'ja';
  await dispatch(
    ACTION.WAIT,
    async ()  => AUTH.signOut(),
  );
  commit(SET_USER, { user: null });
};
