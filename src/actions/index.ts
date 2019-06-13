import * as ACTION from '@/types/ActionTypes';

import { ListenAction } from './ListenAction';
import { WaitAction } from './WaitAction';
import { CreateAction } from './CreateAction';
import { UpdateAction } from './UpdateAction';
import { DeleteAction } from './DeleteAction';
import { NewAction } from './NewAction';
import { LogoutAction } from './LogoutAction';
import { SignupAction } from './SignupAction';
import { SigninAction } from './SigninAction';
import { ProfileUpdateAction } from './ProfileUpdateAction';
import { PasswordResetAction } from './PasswordResetAction';
import { TodayAction } from './TodayAction';
import { YesterdayAction } from './YesterdayAction';
import { TomorrowAction } from './TomorrowAction';
import { SetDateAction } from './SetDateAction';
import { NewUserAction } from './NewUserAction';
import { UpdateUserAction } from './UpdateUserAction';
import { CreateShiftAction } from './CreateShiftAction';
import { AllowShiftAction } from './AllorShiftAction';
import { AllowOverworkAction } from './AllowOverworkAction';
import { UpdateTaskAction } from './UpdateTaskAction';
import { UpdateTaskPriorityAction } from './UpdateTaskPriorityAction';
import { UpdateTaskPlanAction } from './UpdateTaskPlanAction';
import { UpdateTaskActualAction } from './UpdateTaskActualAction';
import { UpdateTaskMemoAction } from './UpdateTaskMemoAction';

export default {
  [ACTION.LISTEN]: ListenAction,
  [ACTION.WAIT]: WaitAction,
  [ACTION.CREATE]: CreateAction,
  [ACTION.UPDATE]: UpdateAction,
  [ACTION.DELETE]: DeleteAction,
  [ACTION.NEW]: NewAction,
  [ACTION.LOGOUT]: LogoutAction,
  [ACTION.SIGNUP]: SignupAction,
  [ACTION.SIGNIN]: SigninAction,
  [ACTION.PROFILE_UPDATE]: ProfileUpdateAction,
  [ACTION.PASSWORD_RESET]: PasswordResetAction,
  [ACTION.TODAY]: TodayAction,
  [ACTION.YESTERDAY]: YesterdayAction,
  [ACTION.TOMORROW]: TomorrowAction,
  [ACTION.SET_DATE]: SetDateAction,
  [ACTION.NEW_USER]: NewUserAction,
  [ACTION.UPDATE_USER]: UpdateUserAction,
  [ACTION.CREATE_SHIFT]: CreateShiftAction,
  [ACTION.ALLOW_SHIFT]: AllowShiftAction,
  [ACTION.ALLOW_OVERWORK]: AllowOverworkAction,
  [ACTION.UPDATE_TASK]: UpdateTaskAction,
  [ACTION.UPDATE_TASK_PRIORITY]: UpdateTaskPriorityAction,
  [ACTION.UPDATE_TASK_PLAN]: UpdateTaskPlanAction,
  [ACTION.UPDATE_TASK_ACTUAL]: UpdateTaskActualAction,
  [ACTION.UPDATE_TASK_MEMO]: UpdateTaskMemoAction,
};
