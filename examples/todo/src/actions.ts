import * as f from './flux';
import { IAction } from './flux';
import * as states from './states';
import * as cursors from './cursors';

export let addTodo = f.createAction(cursors.todos, (todos: states.ITodo[], name: string): states.ITodo[] => {
    return [{ id: Date.now(), name: name, isComplete: false }, ...todos];
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
    completed: boolean;
}

export let changeCompletion = f.createAction(cursors.todos, (todos: states.ITodo[], params: IChangeCompletionParams): states.ITodo[]=> {
    return todos.map(t => {
        if (t.id === params.id)
            return f.shallowCopy(t, (nT) => {
                nT.isComplete = params.completed;
                return nT;
            });
        return t;
    })
});