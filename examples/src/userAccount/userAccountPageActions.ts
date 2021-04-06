import * as f from "../flux";
import * as c from "./userAccountPageStates.cursors";
import * as s from "./userAccountPageStates";
import { userInfoCursor } from "../states.cursors";

export interface IUpdateEditedUserInfoParams {
    email?: string;
    name?: string;
    surname?: string;
}

export const updateEditedUserInfo = f.createUpdateAction<s.IUserInfo | undefined, IUpdateEditedUserInfoParams>(
    c.editedUserInfoCursor,
    (state, params) => {
        return f.shallowCopy(state || s.createDefaultUserInfo(), (s: s.IUserInfo) => {
            if (params?.email !== undefined) s.email = params.email;
            if (params?.name !== undefined) s.name = params.name;
            if (params?.surname !== undefined) s.surName = params.surname;
        });
    }
);

export const enableEditing = f.createAction(c.rootCursor, (state, userInfo: s.IUserInfo) => {
    return f.shallowCopy(state, (s) => {
        s.isEditingEnabled = true;
        s.editedUserInfo = f.shallowCopy(userInfo);
    });
});

export const closeEditing = f.createParamLessAction(c.rootCursor, (state) => {
    return f.shallowCopy(state, (s) => {
        s.isEditingEnabled = false;
        delete s.editedUserInfo;
    });
});

export const submit = (params: s.IUserInfo | undefined): void => {
    submitInternal(params);
    closeEditing();
};

const submitInternal = f.createAction<s.IUserInfo, s.IUserInfo | undefined>(userInfoCursor, (state, userInfo?: s.IUserInfo) => {
    if (userInfo === undefined) {
        return state;
    }

    return f.shallowCopy(state, (s) => {
        s.email = userInfo.email;
        s.name = userInfo.name;
        s.surName = userInfo.surName;
    });
});
