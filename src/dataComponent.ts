import * as b from 'bobril';
import * as f from 'fun-model';
import * as cm from './component';
import * as c from "./common";

export interface IDataComponentState extends f.IState {
}

export interface IDataComponentContext<TState extends IDataComponentState, TData extends Object> extends cm.IContext<TState> {
    data: TData;
}

export function createDataComponent<TState extends IDataComponentState, TData extends Object>(component: b.IBobrilComponent)
    : (cursor: f.ICursor<TState> | c.CursorFieldsMap<f.IState>) => b.IComponentFactory<TData> {
    return (innerCursor: f.ICursor<TState> | c.CursorFieldsMap<f.IState>) =>
        b.createDerivedComponent<TData>(
            b.createVirtualComponent<TData>({
                init(ctx: IDataComponentContext<TState, TData>) {
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
                render(ctx: IDataComponentContext<TState, TData>) {
                    if (c.isCursor(innerCursor)) {
                        ctx.state = f.getState(ctx.cursor);
                    }
                    else {
                        Object.keys(innerCursor).forEach(ck => {
                            (<any>ctx)[c.unifyStateName(ck)] = f.getState((<c.CursorFieldsMap<f.IState>>innerCursor)[ck]);
                        });
                    }
                }
            }),
            component);
}
