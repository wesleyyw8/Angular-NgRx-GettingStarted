import * as fromRoot from '../../state/app.state';
import { createSelector, createFeatureSelector, State } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

export interface State extends fromRoot.State {
  user: UserState;
}

export interface UserState {
  maskUserName: boolean;
}

const initialState: UserState = {
  maskUserName: false
};

//selectors

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export function reducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
    return {
      ...state,
      maskUserName: action.payload
    };
    default: return state;
  }
};