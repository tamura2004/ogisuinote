import { Action } from 'vuex';
import * as ACTION from '@/types/ActionTypes';
import State from '@/models/State';
import moment from 'moment';

export const TodayAction: Action<State, State> = async ({ dispatch }) => {
  const date = moment().startOf('day').valueOf();
  dispatch(ACTION.SET_DATE, date);
};
