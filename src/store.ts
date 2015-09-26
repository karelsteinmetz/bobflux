import * as b from 'node_modules/bobril/index';
import { IState } from './state';
import { ICursor } from './cursor';

let state: IState = null;
let stateSeparator = '.';

let rootStateKey = '';
export let rootCursor: ICursor<IState> = {
    key: rootStateKey
};

export let bootstrap = (defaultState: IState, subStateSeparator: string = '.') => {
    stateSeparator = subStateSeparator;
    state = defaultState;
};

let getInnerState = (innerState: IState, path: string[]): IState => {
    if (path.length === 0)
        return innerState;

    let subPath = path.shift();
    checkSubstate(innerState, subPath);

    return getInnerState(innerState[subPath], path);
};

export let getState = <TState extends IState>(cursor: ICursor<TState>): TState => {
    checkDefaultStateAndCursor(cursor);
    return <TState>(cursor.key === rootStateKey
        ? state
        : getInnerState(state, cursor.key.split(stateSeparator)));
};

export let setState = <TState extends IState>(cursor: ICursor<TState>, updatedState: TState) => {
    let setInnerState = <TInnerState extends IState>(innerState: TInnerState, path: string[]): TInnerState => {
        if (path.length === 0)
            return <any>updatedState;

        let subPath = path.shift();
        checkSubstate(innerState, subPath);

        let newSubState = setInnerState(innerState[subPath], path);
        if (newSubState === innerState[subPath])
            return innerState;

        let newState = <TInnerState>b.assign({}, innerState);
        newState[subPath] = newSubState;
        return newState;
    };

    checkDefaultStateAndCursor(cursor);

    state =
    cursor.key === rootStateKey
        ? updatedState
        : setInnerState(state, cursor.key.split(stateSeparator));
};

function checkSubstate(s: IState, subPath: string) {
    if (!s[subPath])
        throw 'Cursor key does not exist in state.';
}

function checkDefaultStateAndCursor<TState extends IState>(cursor: ICursor<TState>) {
    if (state === null)
        throw 'Default state must be set before first usage.';

    if (cursor.key === null)
        throw 'Cursor key cannot be null.';
}
