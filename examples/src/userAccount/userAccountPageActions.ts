import * as f from "../flux";
import * as s from "./userAccountPageStates";
import * as c from "./userAccountPageStates.cursors";

export interface IUpdateEditedUserInfoParams {
    email?: string;
    name?: string;
    surname?: string;
}

export const updateEditedUserInfo = f.createUpdateAction<IUpdateEditedUserInfoParams>(c.editedUserInfoCursor, (state, params) => {
    debugger;
    console.log("updateEditedUserInfo", state, params);
    return state;
})