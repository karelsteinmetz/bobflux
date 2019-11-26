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
    : (cursor: f.ICursor<TState> | c.CursorFieldsMap<f.IState>) => b.IComponentFactory<TData> {
    return (innerCursor: f.ICursor<TState> | c.CursorFieldsMap<f.IState>) =>
        b.createDerivedComponent(
            b.createVirtualComponent<TData>({
                init(ctx: IRouteComponentContext<TState, TData>) {
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
                    ctx.lastData = ctx.data;

                },
                shouldChange(ctx: IRouteComponentContext<TState, TData>): boolean {
                    let shouldChange = ctx.forceShouldChange;
                    if (c.isCursor(innerCursor)) {
                        let previousState = ctx.state;
                        ctx.state = f.getState(ctx.cursor);
                        shouldChange = ctx.state !== previousState;
                    }
                    else {
                        Object.keys(innerCursor).forEach(ck => {
                            const stateName = c.unifyStateName(ck);
                            const previousState = (<any>ctx)[stateName];
                            (<any>ctx)[stateName] = f.getState((<c.CursorFieldsMap<f.IState>>innerCursor)[ck]);
                            shouldChange = shouldChange || (<any>ctx)[stateName] !== previousState;
                        });
                    }
                    let previousData = ctx.lastData;
                    ctx.lastData = ctx.data;
                    return shouldChange || (ctx.data !== previousData);
                }
            }),
            component);
}
