import * as b from 'bobril';
import * as f from 'fun-model';

export interface IComponentState extends f.IState {
}

export interface IContext<TState extends IComponentState> extends b.IBobrilCtx {
    state: TState;
    forceShouldChange: boolean;
}

export function createComponent<TState extends IComponentState>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState>) => b.IBobrilNode {
    return (c: f.ICursor<TState>) => b.createDerivedComponent(
        b.createComponent({
            init(ctx: IContext<TState>) {
                ctx.state = f.getState(c);
            },
            shouldChange(ctx: IContext<TState>, me: b.IBobrilNode, oldMe: b.IBobrilCacheNode): boolean {
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
