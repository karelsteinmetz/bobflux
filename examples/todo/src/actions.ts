import * as bobflux from '../node_modules/bobflux/dist/index';
import * as states from './states';
import * as cursors from './cursors';

export function addTodo(name: string) {
    return bobflux.createAction(cursors.todos, (todos: states.ITodo[], name: string): states.ITodo[] => {
        return [{ id: Date.now(), name: name, isComplete: false }, ...todos];
    })(name);
}

export let updateEditedTodoName = bobflux.createAction(cursors.editedTodo, (todo: states.ITodo, name: string): states.ITodo => {
    return bobflux.shallowCopy(todo, (t) => {
        t.name = name;
        return t;
    });
});

export let removeTodo = bobflux.createAction(
    cursors.todos,
    (todos: states.ITodo[], id: number): states.ITodo[] => {
        return [...todos.filter(t => t.id !== id)];
    }
);

export interface IChangeCompletionParams {
    id: number;
    completed: boolean;
}

export let changeCompletion = bobflux.createAction(cursors.todos, (todos: states.ITodo[], params: IChangeCompletionParams): states.ITodo[]=> {
    return todos.map(t => {
        if (t.id === params.id)
            return bobflux.shallowCopy(t, (nT) => {
                nT.isComplete = params.completed;
                return nT;
            });
        return t;
    })
});
