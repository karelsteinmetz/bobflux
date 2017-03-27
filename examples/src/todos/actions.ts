import * as f from "../flux";
import * as s from "./state";
import * as c from "./state.cursors";

export const addTodo = f.createParamLessAction<s.ITodosState>(c.rootCursor, (state) =>
    f.shallowCopy(state, (section) => {
        section.todos = [
            { id: new Date().getTime(), isDone: false, name: section.editedTodo.name },
            ...section.todos
        ];
        section.editedTodo = s.createDefaultTodo();
    })
);

export const updateNewTodoName = f.createAction<s.ITodo, string>(c.editedTodoCursor, (todo, name) =>
    f.shallowCopy(todo, (t) => {
        if (name)
            t.name = name;
    })
);

export const removeTodo = f.createAction<s.ITodo[], number>(c.todosCursor, (todos, id) => {
    return [...todos.filter(t => t.id !== id)];
});

export interface IChangeDoneStatusParams {
    id: number;
    isDone: boolean;
}

export const changeDoneStatus = f.createAction<s.ITodo[], IChangeDoneStatusParams>(c.todosCursor, (todos, params) => {
    return todos.map(t => {
        if (params && t.id === params.id)
            return f.shallowCopy(t, (nT) => {
                nT.isDone = params.isDone;
                return nT;
            });
        return t;
    })
});