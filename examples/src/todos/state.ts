import * as f from "../flux";


export interface ITodosState extends f.IRouteComponentState {
    editedTodo: ITodo;
    todos: ITodo[];
}

export interface ITodo extends f.IComponentState {
    id: number;
    isDone: boolean;
    name: string;
}

export const createDefaultTodosState = (): ITodosState => {
    return {
        editedTodo: { id: null, name: "", isDone: false },
        todos: [
            { id: 1, name: "First TODO...", isDone: true },
            { id: 2, name: "Second TODO...", isDone: false }
        ]
    }
}

export const createDefaultTodo = (): ITodo => {
    return { id: 0, name: null, isDone: false };
}
