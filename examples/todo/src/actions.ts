import * as f from './flux';
import * as s from './states';
import * as c from './cursors';

export let addTodo = f.createAction<s.ITodosState, any>(c.todosSection, (state) =>
    f.shallowCopy(state, (section) => {
        section.todos = [
            { id: new Date().getTime(), isDone: false, name: section.editedTodo.name },
            ...section.todos
        ];
        section.editedTodo = { id: null, name: '', isDone: false };
    })
);

export let updateNewTodoName = f.createAction<s.ITodo, string>(c.editedTodo, (todo, name) =>
    f.shallowCopy(todo, (t) => {
        t.name = name;
    })
);

export let removeTodo = f.createAction<s.ITodo[], number>(c.todos, (todos, id) => {
    return [...todos.filter(t => t.id !== id)];
});

export interface IChangeDoneStatusParams {
    id: number;
    isDone: boolean;
}

export let changeDoneStatus = f.createAction<s.ITodo[], IChangeDoneStatusParams>(c.todos, (todos, params) => {
    return todos.map(t => {
        if (t.id === params.id)
            return f.shallowCopy(t, (nT) => {
                nT.isDone = params.isDone;
                return nT;
            });
        return t;
    })
});