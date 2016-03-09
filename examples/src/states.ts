import * as f from './flux';
import * as td from './todos/state';
import * as wn from './whatNext/state';

export interface IApplicationState extends f.IRouteComponentState {
    todos: td.ITodosState
    whatNext: wn.IWhatNextState
}

export const createDefaultApplicationState = (): IApplicationState => {
    return {
        todos: td.createDefaultTodosState(),
        whatNext: wn.createDefaultWhatNextState()
    };
}
