import * as f from "../flux";

export interface IUserInfo extends f.IComponentState {
    email: string;
    name: string;
    surName: string;
}

export const createDefaultUserInfo = (): IUserInfo => {
    return {
        email: "name@domain.com",
        name: null,
        surName: null
    };
} 

export interface IUserAccountPageState extends f.IRouteComponentState {
    userInfo: IUserInfo;
    editedUserInfo: IUserInfo;
}

export const createDefaultUserAccountPageState = (): IUserAccountPageState => {
    return {
        userInfo: createDefaultUserInfo(),
        editedUserInfo: null
    }
}