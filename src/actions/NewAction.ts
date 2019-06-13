import { Action } from 'vuex';
import State from '@/models/State';
import { db } from '@/plugins/firebase';

export const NewAction: Action<State, State> = async ({}, { id, payload }) => {
  const conn = db.collection(payload.constructor.collectionName);
  await conn.doc(id).set({...payload});
};
