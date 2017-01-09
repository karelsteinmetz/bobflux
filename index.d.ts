import { IState, debugCallbackType } from 'fun-model';
export { ICursor, ICursorFactory, IState, IActionHandler, getState, setState, rootCursor, shallowCopy, IAction, createAction, createActions, IAsyncAction, createAsyncAction, debugCallbackType } from 'fun-model';
export * from './src/component';
export * from './src/routeComponent';
export * from './src/dataComponent';
export declare let bootstrap: (defaultState: IState, debugCallback?: debugCallbackType, subStateSeparator?: string) => void;
export declare const defaultStateName: string;
