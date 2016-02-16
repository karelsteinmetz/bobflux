import * as f from './flux';
import * as td from './todos/state';
import * as wn from './whatNext/state';

export interface IApplicationState extends f.IState {
    todos: td.ITodosState
    whatNext: wn.IWhatNextState
}

export default(): IApplicationState => {
    return {
        todos: td.default(),
        whatNext: wn.default()
    };
}
