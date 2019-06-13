import { Action } from 'vuex';
import * as ACTION from '@/types/ActionTypes';
import State from '@/models/State';
import moment from 'moment';

export const YesterdayAction: Action<State, State> = async ({ dispatch, state }) => {
  const date = moment(state.date).subtract(1, 'days').valueOf();
  dispatch(ACTION.SET_DATE, date);
};
