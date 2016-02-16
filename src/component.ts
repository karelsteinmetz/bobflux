import * as b from 'bobril';
import * as f from 'fun-model';

export interface IContext<TState extends f.IState> extends b.IBobrilCtx {
    state: TState;
    forceShouldChange: boolean;
}

export function createComponent<TState extends f.IState>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState>) => b.IBobrilNode {
    return (c: f.ICursor<TState>) => b.createDerivedComponent(
        b.createComponent({
            init(ctx: IContext<f.IState>) {
                ctx.state = f.getState(c);
            },
            shouldChange(ctx: IContext<f.IState>, me: b.IBobrilNode, oldMe: b.IBobrilCacheNode): boolean {
                let currentState = f.getState(c);
                if (ctx.forceShouldChange) {
                    ctx.state = currentState;
                    return true;
                }
                if (currentState === ctx.state)
                    return false;
                ctx.state = currentState;
                return true;
            }
        }),
        component)();
}
