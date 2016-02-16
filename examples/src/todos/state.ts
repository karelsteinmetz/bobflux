import * as f from '../flux';


export interface ITodosState extends f.IState {
    editedTodo: ITodo;
    todos: ITodo[];
}

export interface ITodo {
    id: number;
    isDone: boolean;
    name: string;
}

export default (): ITodosState => {
    return {
        editedTodo: { id: null, name: '', isDone: false },
        todos: [
            { id: 1, name: 'First TODO...', isDone: true },
            { id: 2, name: 'Second TODO...', isDone: false }
        ]
    }
}