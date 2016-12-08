import * as s from "./states";
import * as f from "./flux";
import * as td from "./todos/state";
import * as wn from "./whatNext/state";

export const rootKey = f.rootCursor.key;

export const rootCursor: f.ICursor<s.IApplicationState> = f.rootCursor

export const todosCursor: f.ICursor<td.ITodosState> = {
    key: "todos"
}

export const whatNextCursor: f.ICursor<wn.IWhatNextState> = {
    key: "whatNext"
}

export const userAccountCursor: f.ICursor<s.IUserAccountPageState> = {
    key: "userAccount"
}

export const userInfoCursor: f.ICursor<s.IUserInfo> = {
    key: "userInfo"
}
