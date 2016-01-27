import * as f from './flux';
import * as td from './todos/state';

export interface IApplicationState extends f.IState {
    todoSection: td.ITodosState;
}

export default(): IApplicationState => {
    return {
        todoSection: {
            editedTodo: { id: null, name: '', isDone: false },
            todos: [
                { id: 1, name: 'First TODO...', isDone: true },
                { id: 2, name: 'Second TODO...', isDone: false }
            ]
        }
    };
}
