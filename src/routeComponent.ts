import * as b from "bobril";
import * as f from "fun-model";
import * as cm from "./component";
import * as c from "./common";

export interface IRouteComponentState extends f.IState {
}

export interface IRouteData {
    parentRouteName?: string;
    routeParams: b.Params;
}

export interface IRouteComponentContext<TState extends IRouteComponentState, TData extends IRouteData> extends cm.IContext<TState> {
    data: TData;
    lastData: TData;
}


export function createRouteComponent<TState extends IRouteComponentState, TData extends IRouteData>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState> | c.CursorFieldsMap<TState>) => (data?: TData, children?: b.IBobrilChildren) => b.IBobrilNode {
    return (innerCursor: f.ICursor<TState> | c.CursorFieldsMap<TState>) =>
        b.createDerivedComponent<TData>(
            b.createVirtualComponent<TData>({
                init(ctx: IRouteComponentContext<TState, TData>) {
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
                    ctx.lastData = ctx.data;

                },
                shouldChange(ctx: IRouteComponentContext<TState, TData>, me: b.IBobrilNode, oldMe: b.IBobrilCacheNode): boolean {
                    let shouldChange = false;
                    if (c.isCursor(innerCursor)) {
                        let previousState = ctx.state;
                        ctx.state = f.getState(ctx.cursor);
                        shouldChange = ctx.forceShouldChange || ctx.state !== previousState;
                    }
                    else {
                        Object.keys(innerCursor).forEach(ck => {
                            const stateName = c.unifyStateName(ck);
                            const previousState = ctx[stateName];
                            ctx[stateName] = f.getState(innerCursor[ck]);
                            shouldChange = shouldChange || ctx.forceShouldChange || ctx[stateName] !== previousState;
                        });
                        shouldChange;
                    }
                    let previousData = ctx.lastData;
                    ctx.lastData = ctx.data;
                    return ctx.forceShouldChange || !(ctx.data === previousData && !shouldChange);
                }
            }),
            component);
}
