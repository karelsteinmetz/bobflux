import * as bobflux from 'node_modules/bobflux/dist/src/index';


export interface ITodo {
    id: number;
    isComplete: boolean;
    name: string;
}

export interface ITodosState extends bobflux.IState {
    editedTodo: ITodo;
    todos: ITodo[];
}

export interface IApplicationState extends bobflux.IState {
    todoSection: ITodosState;
}

export default(): IApplicationState => {
    return {
        todoSection: {
            editedTodo: { id: null, name: '', isComplete: false },
            todos: [
                { id: 1, name: 'First TODO...', isComplete: false },
                { id: 2, name: 'Second TODO...', isComplete: false }
            ]
        }
    };
}
