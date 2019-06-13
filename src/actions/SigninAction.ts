import { Action } from 'vuex';
import State from '@/models/State';
import firebase from 'firebase/app';
import 'firebase/auth';

export const SigninAction: Action<State, State> = async ({ dispatch }, { email, password }) => {
  const AUTH = firebase.auth();
  AUTH.languageCode = 'ja';
  await AUTH.signInWithEmailAndPassword(email, password);
};
