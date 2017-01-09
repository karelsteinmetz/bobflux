import * as b from "bobril";
import * as f from "fun-model";
import * as cm from "./component";
import * as c from "./common";
export interface IRouteComponentState extends f.IState {
}
export interface IRouteData {
    parentRouteName?: string;
    routeParams: b.Params;
}
export interface IRouteComponentContext<TState extends IRouteComponentState, TData extends IRouteData> extends cm.IContext<TState> {
    data: TData;
    lastData: TData;
}
export declare function createRouteComponent<TState extends IRouteComponentState, TData extends IRouteData>(component: b.IBobrilComponent): (cursor: f.ICursor<TState> | c.CursorFieldsMap<TState>) => (data?: TData, children?: b.IBobrilChildren) => b.IBobrilNode;
