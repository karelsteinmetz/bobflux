import * as s from './state';
import * as f from '../flux';

export const rootCursor: f.ICursor<s.ITodosState> = {
    key: 'todos'
}

export const editedTodoCursor: f.ICursor<s.ITodo> = {
    key: 'todos.editedTodo'
}

export const todosCursor: f.ICursor<s.ITodo[]> = {
    key: 'todos.todos'
}

export const todosEditedTodoIdCursor: f.ICursor<number> = {
    key: 'todos.todos.editedTodo.id'
}

export const todosEditedTodoIsDoneCursor: f.ICursor<boolean> = {
    key: 'todos.todos.editedTodo.isDone'
}

export const todosEditedTodoNameCursor: f.ICursor<string> = {
    key: 'todos.todos.editedTodo.name'
}
