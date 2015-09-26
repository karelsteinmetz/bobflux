import * as b from 'node_modules/bobril/index';
import { ICursor } from './cursor';
import { IState } from './state';
import { setState, getState } from './store';

export interface IAction<T> {
    (param?: T): void;
}

export function createAction<TState extends IState, TParam>(
    cursor: ICursor<TState>,
    handler: (state: TState, t?: TParam) => TState
    ): IAction<TParam> {
    return <IAction<TParam>>((param?: TParam): void => {
        let oldState = getState(cursor);
        let newState = handler(oldState, param);
        if (oldState !== newState) {
            setState(cursor, newState);
            b.invalidate();
        }
    });
}
