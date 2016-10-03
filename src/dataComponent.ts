import * as b from 'bobril';
import * as f from 'fun-model';
import * as cm from './component';

export interface IDataComponentState extends f.IState {
}

export interface IDataComponentContext<TState extends IDataComponentState, TData extends Object> extends cm.IContext<TState> {
    data: TData;
}

export function createDataComponent<TState extends IDataComponentState, TData extends Object>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState>) => (data?: TData, children?: b.IBobrilChildren) => b.IBobrilNode {
    return (c: f.ICursor<TState>) =>
        b.createDerivedComponent<TData>(
            b.createVirtualComponent<TData>({
                init(ctx: IDataComponentContext<TState, TData>) {
                    ctx.cursor = c;
                    ctx.state = f.getState(ctx.cursor);
                },
                render(ctx: IDataComponentContext<TState, TData>) {
                    ctx.state = f.getState(ctx.cursor);
                }
            }),
            component);
}
