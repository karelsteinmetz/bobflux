import * as s from './state';
import * as f from '../flux';

export let rootCursor: f.ICursor<s.ITodosState> = {
    key: 'todos'
}

export let editedTodoCursor: f.ICursor<s.ITodo> = {
    key: 'todos.editedTodo'
}

export let todosCursor: f.ICursor<s.ITodo[]> = {
    key: 'todos.todos'
}

export let todosEditedTodoIdCursor: f.ICursor<number> = {
    key: 'todos.todos.editedTodo.id'
}

export let todosEditedTodoIsDoneCursor: f.ICursor<boolean> = {
    key: 'todos.todos.editedTodo.isDone'
}

export let todosEditedTodoNameCursor: f.ICursor<string> = {
    key: 'todos.todos.editedTodo.name'
}
