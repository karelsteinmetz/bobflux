import { IState, IBootstrapParams } from 'fun-model';
export { IBootstrapParams, ICursor, ICursorFactory, IState, IActionHandler, IParamLessActionHandler, getState, setState, rootCursor, shallowCopy, IAction, IParamLessAction, createAction, createActions, createParamLessAction, createParamLessActions, createReplaceAction, debugCallbackType } from 'fun-model';
export * from './src/component';
export * from './src/routeComponent';
export * from './src/dataComponent';
export declare const bootstrap: (defaultState: IState, params?: IBootstrapParams) => void;
export declare const defaultStateName = "";
