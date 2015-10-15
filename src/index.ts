import * as b from 'node_modules/bobril/index';
import { IState, bootstrap as funBootstrap } from 'node_modules/fun-model/dist/src/index';

export { ICursor, IState, getState, setState, rootCursor, shallowCopy, IAction, createAction, createActions } from 'node_modules/fun-model/dist/src/index';
export * from './component';

export let bootstrap = (defaultState: IState, subStateSeparator: string = '.') => {
    funBootstrap(defaultState, () => b.invalidate());
};
