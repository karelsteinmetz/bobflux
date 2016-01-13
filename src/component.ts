import * as b from 'bobril';
import * as f from 'fun-model';

export interface IContext<TState extends f.IState> extends b.IBobrilCtx {
    state: TState;
    forceShouldChange: boolean;
}

export function createComponent<TState extends f.IState, TData>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState>, data?: TData, children?: b.IBobrilChildren) => b.IBobrilNode {
    return (c: f.ICursor<TState>, d: TData, ch?: b.IBobrilChildren) => b.createDerivedComponent<TData>(
        b.createComponent({
            init(ctx: IContext<f.IState>) {
                ctx.state = f.getState(c);
            },
            shouldChange(ctx: IContext<f.IState>, me: b.IBobrilNode, oldMe: b.IBobrilCacheNode): boolean {
                if (ctx.forceShouldChange)
                    return true;
                    
                let currentState = f.getState(c);
                if (currentState === ctx.state)
                    return false;

                ctx.state = currentState;
                return true;
            }
        }),
        component)(d, ch);
}
