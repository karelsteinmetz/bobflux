import * as s from './userAccountPageStates';
import * as f from '../flux';

export const rootKey = 'whatNext';

export const rootCursor: f.ICursor<s.IUserAccountPageState> = {
    key: rootKey
}

export const userInfoCursor: f.ICursor<s.IUserInfo> = {
    key: rootKey + '.userInfo'
}

export const editedUserInfoCursor: f.ICursor<s.IUserInfo> = {
    key: rootKey + '.editedUserInfo'
}