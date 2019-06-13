import { Action } from 'vuex';
import State from '@/models/State';
import { db } from '@/plugins/firebase';

export const DeleteAction: Action<State, State> = async ({}, { collectionName, id }) => {
  await db.collection(collectionName).doc(id).delete();
};
