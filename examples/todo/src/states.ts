import * as f from './flux';

export interface ITodo {
    id: number;
    isDone: boolean;
    name: string;
}

export interface ITodosState extends f.IState {
    editedTodo: ITodo;
    todos: ITodo[];
}

export interface IApplicationState extends f.IState {
    todoSection: ITodosState;
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
