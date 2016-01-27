import * as f from '../flux';

export interface ITodo extends f.IState {
    id: number;
    isDone: boolean;
    name: string;
}

export interface ITodosState {
    editedTodo: ITodo;
    todos: ITodo[];
}