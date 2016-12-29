import * as b from 'bobril';
import { IState, bootstrap as funBootstrap, debugCallbackType } from 'fun-model';

export {
ICursor,
ICursorFactory,
IState,
IActionHandler,
getState,
setState,
rootCursor,
shallowCopy,
IAction,
createAction,
createActions,
IAsyncAction,
createAsyncAction,
debugCallbackType
} from 'fun-model';

export * from './src/component';
export * from './src/routeComponent';
export * from './src/dataComponent';

export let bootstrap = (defaultState: IState, debugCallback: debugCallbackType = undefined, subStateSeparator: string = '.') => {
    funBootstrap(defaultState, () => b.invalidate(), (message, params) => { debugCallback && debugCallback(`bobflux -> ${message}`, params); });
};

export const defaultStateName = "";
