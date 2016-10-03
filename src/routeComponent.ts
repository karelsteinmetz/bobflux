import * as b from 'bobril';
import * as f from 'fun-model';
import * as cm from './component';

export interface IRouteComponentState extends f.IState {
}

export interface IRouteData {
    routeParams: b.Params;
}

export interface IRouteComponentContext<TState extends IRouteComponentState, TData extends IRouteData> extends cm.IContext<TState> {
    data: TData;
    lastData: TData;
}

export function createRouteComponent<TState extends IRouteComponentState, TData extends IRouteData>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState>) => (data?: TData, children?: b.IBobrilChildren) => b.IBobrilNode {
    return (c: f.ICursor<TState>) =>
        b.createDerivedComponent<TData>(
            b.createVirtualComponent<TData>({
                init(ctx: IRouteComponentContext<TState, TData>) {
                    ctx.cursor = c;
                    ctx.state = f.getState(ctx.cursor);
                    ctx.lastData = ctx.data;
                },
                shouldChange(ctx: IRouteComponentContext<TState, TData>, me: b.IBobrilNode, oldMe: b.IBobrilCacheNode): boolean {
                    let previousState = ctx.state;
                    let previousData = ctx.lastData;
                    ctx.state = f.getState(ctx.cursor);
                    ctx.lastData = ctx.data;
                    return ctx.forceShouldChange || !(ctx.data === previousData && ctx.state === previousState);
                }
            }),
            component);
}
