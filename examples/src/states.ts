import * as f from "./flux";
import * as td from "./todos/state";
import * as wn from "./whatNext/state";
import * as ua from "./userAccount/userAccountPageStates";

export * from "./todos/state";
export * from "./whatNext/state";
export * from "./userAccount/userAccountPageStates";

export interface IApplicationState extends f.IRouteComponentState {
    todos: td.ITodosState;
    whatNext: wn.IWhatNextState;
    userAccount: ua.IUserAccountPageState;
    userInfo: ua.IUserInfo;
}

export const createDefaultApplicationState = (): IApplicationState => {
    return {
        todos: td.createDefaultTodosState(),
        whatNext: wn.createDefaultWhatNextState(),
        userAccount: ua.createDefaultUserAccountPageState(),
        userInfo: f.shallowCopy(ua.createDefaultUserInfo(), ns => {
            ns.email = "name@domain.com";
        })
    };
}

