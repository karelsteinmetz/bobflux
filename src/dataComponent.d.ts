import * as b from 'bobril';
import * as f from 'fun-model';
import * as cm from './component';
import * as c from "./common";
export interface IDataComponentState extends f.IState {
}
export interface IDataComponentContext<TState extends IDataComponentState, TData extends Object> extends cm.IContext<TState> {
    data: TData;
}
export declare function createDataComponent<TState extends IDataComponentState, TData extends Object>(component: b.IBobrilComponent): (cursor: f.ICursor<TState> | c.CursorFieldsMap<TState>) => (data?: TData, children?: b.IBobrilChildren) => b.IBobrilNode;
