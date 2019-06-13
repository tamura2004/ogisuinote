import { Action } from 'vuex';
import State from '@/models/State';
import { db } from '@/plugins/firebase';

export const UpdateAction: Action<State, State> = async ({}, { collectionName, id, updates }) => {
  await db.collection(collectionName).doc(id).update(updates);
};
