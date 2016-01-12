import * as b from 'bobril';
import { IState, bootstrap as funBootstrap, debugCallbackType } from 'fun-model';

export {
ICursor,
ICursorFactory,
IState,
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

export let bootstrap = (defaultState: IState, debugCallback: debugCallbackType = undefined, subStateSeparator: string = '.') => {
    funBootstrap(defaultState, () => b.invalidate(), (message, params) => { debugCallback && debugCallback(`bobflux -> ${message}`, params) });
};
