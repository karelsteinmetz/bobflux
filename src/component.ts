import * as b from 'bobril';
import * as f from 'fun-model';

export interface IComponentState extends f.IState {
}

export interface IContext<TState extends IComponentState> extends b.IBobrilCtx {
    state: TState;
    cursor: f.ICursor<TState>;
    forceShouldChange: boolean;
}

export function createComponent<TState extends IComponentState>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState>) => (children?: b.IBobrilChildren) => b.IBobrilNode {
    return (c: f.ICursor<TState>) => (children?: b.IBobrilChildren) => b.createDerivedComponent(
        b.createComponent({
            init(ctx: IContext<TState>) {
                ctx.cursor = c;
                ctx.state = f.getState(ctx.cursor);
            },
            shouldChange(ctx: IContext<TState>, me: b.IBobrilNode, oldMe: b.IBobrilCacheNode): boolean {
                let previousState = ctx.state;
                ctx.state = f.getState(ctx.cursor);
                return ctx.forceShouldChange || ctx.state !== previousState;
            }
        }),
        component)(null, children);
}
