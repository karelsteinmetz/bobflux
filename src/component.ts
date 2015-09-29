import * as b from 'node_modules/bobril/index';
import { ICursor } from './cursor';
import { IState } from './state';
import { getState } from './store';

export interface IContext<TState extends IState> extends b.IBobrilCtx {
    state: TState;
}

export function createComponent<TState extends IState, TData>(component: b.IBobrilComponent)
    : (cursor: ICursor<TState>, data: TData, children?: b.IBobrilChildren) => b.IBobrilNode {
    return (c: ICursor<TState>, d: TData, ch?: b.IBobrilChildren) => b.createDerivedComponent<TData>(
        b.createComponent({
            init(ctx: IContext<IState>) {
                ctx.state = getState(c);
            },
            shouldChange(ctx: IContext<IState>, me: b.IBobrilNode, oldMe: b.IBobrilCacheNode): boolean {
                let currentState = getState(c);
                if (currentState === ctx.state)
                    return false;

                ctx.state = currentState;
                return true;
            }
        }),
        component)(d, ch);
}
