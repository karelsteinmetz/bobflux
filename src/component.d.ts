import * as b from "bobril";
import * as f from "fun-model";
import * as c from "./common";
export interface IComponentState extends f.IState {
}
export interface IContext<TState extends IComponentState> extends b.IBobrilCtx {
    state: TState;
    cursor: f.ICursor<TState>;
    forceShouldChange: boolean;
}
export interface IComponentFactory {
    (children?: b.ChildrenType<never>): b.IBobrilNode;
}
export declare function createComponent<TState extends IComponentState>(component: b.IBobrilComponent): (cursor: f.ICursor<TState> | c.CursorFieldsMap<f.IState>) => IComponentFactory;
