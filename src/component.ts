import * as b from "bobril";
import * as f from "fun-model";
import * as c from "./common";

export interface IComponentState extends f.IState {
}

export interface IContext<TState extends IComponentState> extends b.IBobrilCtx {
    state: TState;
    cursor: f.ICursor<TState>;
    forceShouldChange: boolean;
}

export interface IComponentFactory {
    (children?: b.IBobrilChildren): b.IBobrilNode;
}

export function createComponent<TState extends IComponentState>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState> | c.CursorFieldsMap<TState>) => IComponentFactory {
    return (innerCursor: f.ICursor<TState> | c.CursorFieldsMap<TState>) => (children?: b.IBobrilChildren) => b.createDerivedComponent(
        b.createVirtualComponent({
            init(ctx: IContext<TState>) {
                if (c.isCursor(innerCursor)) {
                    ctx.cursor = innerCursor;
                    ctx.state = f.getState(ctx.cursor);
                }
                else {
                    Object.keys(innerCursor).forEach(ck => {
                        ctx[c.unifyCursorName(ck)] = innerCursor[ck];
                        ctx[c.unifyStateName(ck)] = f.getState(innerCursor[ck]);
                    });
                }
            },
            shouldChange(ctx: IContext<TState>, me: b.IBobrilNode, oldMe: b.IBobrilCacheNode): boolean {
                if (c.isCursor(innerCursor)) {
                    const previousState = ctx.state;
                    ctx.state = f.getState(ctx.cursor);
                    return ctx.forceShouldChange || ctx.state !== previousState;
                }
                else {
                    let shouldChange = false;
                    Object.keys(innerCursor).forEach(ck => {
                        const stateName = c.unifyStateName(ck);
                        const previousState = ctx[stateName];
                        ctx[stateName] = f.getState(innerCursor[ck]);
                        shouldChange = shouldChange || ctx.forceShouldChange || ctx[stateName] !== previousState;
                    });
                    return shouldChange;
                }
            }
        }),
        component)(null, children);
}
