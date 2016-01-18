import * as b from 'bobril';
import * as f from 'fun-model';
import * as cm from './component';

export interface IRouteData {
    routeParams: b.Params
}

export interface IRouteContext<TState extends f.IState, TData extends IRouteData> extends cm.IContext<TState> {
    data: TData
    lastData: TData
}

export function createRouteComponent<TState extends f.IState, TData extends IRouteData>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState>) => (data?: TData, children?: b.IBobrilChildren) => b.IBobrilNode {
    return (c: f.ICursor<TState>) =>
        b.createDerivedComponent<TData>(
            b.createComponent({
                init(ctx: IRouteContext<TState, TData>) {
                    ctx.state = f.getState(c);
                    ctx.lastData = ctx.data;
                },
                shouldChange(ctx: IRouteContext<TState, TData>, me: b.IBobrilNode, oldMe: b.IBobrilCacheNode): boolean {
                    if (ctx.forceShouldChange)
                        return true;
                    let currentState = f.getState(c);
                    if (ctx.data === ctx.lastData && currentState === ctx.state)
                        return false;
                    ctx.state = currentState;
                    ctx.lastData = ctx.data;
                    return true;
                }
            }),
            component)
}
