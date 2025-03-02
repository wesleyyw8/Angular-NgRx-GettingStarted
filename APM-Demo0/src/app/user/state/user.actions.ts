import { Action } from '@ngrx/store';
import { User } from '../user';

export enum UserActionTypes {
  MaskUserName = '[User] Mask User Name'
}

export class MaskUserName implements Action {
  readonly type = UserActionTypes.MaskUserName;
  constructor(public payload: boolean) {}
}

export type UserActions = MaskUserName;

