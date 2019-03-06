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
    (children?: b.ChildrenType<never>): b.IBobrilNode;
}

export function createComponent<TState extends IComponentState>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState> | c.CursorFieldsMap<f.IState>) => IComponentFactory {
    return (innerCursor: f.ICursor<TState> | c.CursorFieldsMap<f.IState>) => (children?: b.IBobrilChildren) => b.createDerivedComponent(
        b.createVirtualComponent({
            init(ctx: IContext<TState>) {
                ctx.forceShouldChange = false;
                if (c.isCursor(innerCursor)) {
                    ctx.cursor = innerCursor;
                    ctx.state = f.getState(ctx.cursor);
                }
                else {
                    Object.keys(innerCursor).forEach(ck => {
                        (<any>ctx)[c.unifyCursorName(ck)] = (<c.CursorFieldsMap<f.IState>>innerCursor)[ck];
                        (<any>ctx)[c.unifyStateName(ck)] = f.getState((<c.CursorFieldsMap<f.IState>>innerCursor)[ck]);
                    });
                }
            },
            shouldChange(ctx: IContext<TState>): boolean {
                if (c.isCursor(innerCursor)) {
                    const previousState = ctx.state;
                    ctx.state = f.getState(ctx.cursor);
                    return ctx.forceShouldChange || ctx.state !== previousState;
                }
                else {
                    let shouldChange = ctx.forceShouldChange;
                    Object.keys(innerCursor).forEach(ck => {
                        const stateName = c.unifyStateName(ck);
                        const previousState = (<any>ctx)[stateName];
                        (<any>ctx)[stateName] = f.getState((<c.CursorFieldsMap<f.IState>>innerCursor)[ck]);
                        shouldChange = shouldChange || (<any>ctx)[stateName] !== previousState;
                    });
                    return shouldChange;
                }
            }
        }),
        component)({ children })
}
