import * as f from "../flux";
import * as c from "./userAccountPageStates.cursors";
import * as s from "./userAccountPageStates";

export interface IUpdateEditedUserInfoParams {
    email?: string;
    name?: string;
    surname?: string;
}

export const updateEditedUserInfo = f.createUpdateAction<s.IUserInfo, IUpdateEditedUserInfoParams>(c.editedUserInfoCursor, (state, _params) => {
    return state;
})