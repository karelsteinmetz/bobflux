import * as f from './flux';
import { IAction } from './flux';
import * as states from './states';
import * as cursors from './cursors';

export let addTodo = f.createAction(cursors.todos, (todos: states.ITodo[], name: string): states.ITodo[] => {
    return [{ id: Date.now(), name: name, isDone: false }, ...todos];
});

export let updateEditedTodoName = f.createAction(cursors.editedTodo, (todo: states.ITodo, name: string): states.ITodo => {
    return f.shallowCopy(todo, (t) => {
        t.name = name;
        return t;
    });
});

export let removeTodo = f.createAction(
    cursors.todos,
    (todos: states.ITodo[], id: number): states.ITodo[] => {
        return [...todos.filter(t => t.id !== id)];
    }
);

export interface IChangeCompletionParams {
    id: number;
    isDone: boolean;
}

export let changeDoneStatus = f.createAction<states.ITodo[], IChangeCompletionParams>(cursors.todos, (todos, params) => {
    return todos.map(t => {
        if (t.id === params.id)
            return f.shallowCopy(t, (nT) => {
                nT.isDone = params.isDone;
                return nT;
            });
        return t;
    })
});