import * as s from '../src/states';
import * as f from '../src/flux';
import * as td from '../src/todos/state';
import * as wn from '../src/whatNext/state';

export class ApplicationStateBuilder {
    private state: s.IApplicationState = s.default();

    public withTodos(todos: td.ITodosState): ApplicationStateBuilder {
        this.state.todos = todos;
        return this;
    };

    public withWhatNext(whatNext: wn.IWhatNextState): ApplicationStateBuilder {
        this.state.whatNext = whatNext;
        return this;
    };

    public build(): s.IApplicationState {
        f.bootstrap(this.state);
        return this.state;
    }
}
