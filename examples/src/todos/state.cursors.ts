import * as s from './state';
import * as f from '../flux';

export const rootKey = 'todos';

export const rootCursor: f.ICursor<s.ITodosState> = {
    key: rootKey
}

export const editedTodoCursor: f.ICursor<s.ITodo> = {
    key: rootKey + '.editedTodo'
}

export const todosCursor: f.ICursor<s.ITodo[]> = {
    key: rootKey + '.todos'
}

export const editedTodoIdCursor: f.ICursor<number> = {
    key: rootKey + '.editedTodo.id'
}

export const editedTodoIsDoneCursor: f.ICursor<boolean> = {
    key: rootKey + '.editedTodo.isDone'
}

export const editedTodoNameCursor: f.ICursor<string> = {
    key: rootKey + '.editedTodo.name'
}
