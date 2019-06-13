import { Action } from 'vuex';
import State from '@/models/State';
import { db } from '@/plugins/firebase';

export const CreateAction: Action<State, State> = async ({}, payload) => {
  const conn = db.collection(payload.constructor.collectionName);
  const ref: any = await conn.add({...payload});
  return ref.id;
};
