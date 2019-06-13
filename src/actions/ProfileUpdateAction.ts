import { Action } from 'vuex';
import State from '@/models/State';

export const ProfileUpdateAction: Action<State, State> = async ({}, { user, name}) => {
  user.updateProfile({ displayName: name });
};
