import * as b from 'bobril';
import * as f from 'fun-model';
export interface IComponentState extends f.IState {
}
export interface IContext<TState extends IComponentState> extends b.IBobrilCtx {
    state: TState;
    cursor: f.ICursor<TState>;
    forceShouldChange: boolean;
}
export declare function createComponent<TState extends IComponentState>(component: b.IBobrilComponent): (cursor: f.ICursor<TState>) => (children?: b.IBobrilChildren) => b.IBobrilNode;
