import * as b from 'bobril';
import * as f from 'fun-model';
import * as cm from './component';

export function createRouteComponent<TState extends f.IState, TData>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState>, data?: TData, children?: b.IBobrilChildren) => b.IBobrilNode {
    return (c: f.ICursor<TState>, d?: TData, ch?: b.IBobrilChildren) =>
        b.createVirtualComponent<TData>({
            render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
                me.children = cm.createComponent(component)(c,d);
            }
        });
}
