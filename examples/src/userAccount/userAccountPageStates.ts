import * as f from "../flux";

export interface IUserInfo extends f.IComponentState {
    email: string;
    name: string;
    surName: string;
}

export const createDefaultUserInfo = (): IUserInfo => {
    return {
        email: "",
        name: "",
        surName: ""
    };
}

export interface IUserAccountPageState extends f.IRouteComponentState {
    isEditingEnabled: boolean;
    editedUserInfo: IUserInfo;
}

export const createDefaultUserAccountPageState = (): IUserAccountPageState => {
    return {
        isEditingEnabled: false,
        editedUserInfo: null
    };
}