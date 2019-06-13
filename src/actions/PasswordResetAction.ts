import { Action } from 'vuex';
import State from '@/models/State';
import firebase from 'firebase/app';
import 'firebase/auth';

export const PasswordResetAction: Action<State, State> = async ({}, { email }) => {
  const AUTH = firebase.auth();
  AUTH.languageCode = 'ja';
  AUTH.sendPasswordResetEmail(email);
};
