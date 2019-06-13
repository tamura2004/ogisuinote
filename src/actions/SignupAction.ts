import { Action } from 'vuex';
import State from '@/models/State';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as ACTION from '@/types/ActionTypes';

export const SignupAction: Action<State, State> = async ({ dispatch }, { email, password, name, manager }) => {
  const AUTH = firebase.auth();
  AUTH.languageCode = 'ja';
  const { user } = await AUTH.createUserWithEmailAndPassword(email, password);
  if (user === null || !user.uid) {
    alert('fail to create user');
    return;
  }
  await dispatch(ACTION.PROFILE_UPDATE, { user, name });
  const id = user.uid;
  await dispatch(ACTION.NEW_USER, { id, name, email, manager });
};
