import * as s from "./userAccountPageStates";
import * as f from "../flux";

export const rootKey = "userAccount";

export const rootCursor: f.ICursor<s.IUserAccountPageState> = {
    key: rootKey
}

export const editedUserInfoCursor: f.ICursor<s.IUserInfo> = {
    key: rootKey + ".editedUserInfo"
}