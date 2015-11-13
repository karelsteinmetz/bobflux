import * as b from 'node_modules/bobril/index';
import { IState, bootstrap as funBootstrap, debugCallbackType } from 'node_modules/fun-model/dist/index';

export { ICursor, IState, getState, setState, rootCursor, shallowCopy, IAction, createAction, createActions, debugCallbackType } from 'node_modules/fun-model/dist/index';
export * from './component';

export let bootstrap = (defaultState: IState, debugCallback: debugCallbackType = undefined, subStateSeparator: string = '.') => {
    funBootstrap(defaultState, () => b.invalidate(), (message, params) => { debugCallback && debugCallback(`bobflux -> ${message}`, params) });
};
