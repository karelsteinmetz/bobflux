import * as s from './state';
import * as f from '../flux';

export let rootCursor: f.ICursor<s.ITodosState> = {
    key: 'todoSection'
}

export let editedTodoCursor: f.ICursor<s.ITodo> = {
    key: 'todoSection.editedTodo'
}

export let todosCursor: f.ICursor<s.ITodo[]> = {
    key: 'todoSection.todos'
}

export let todoSectionEditedTodoIdCursor: f.ICursor<number> = {
    key: 'todoSection.todoSection.editedTodo.id'
}

export let todoSectionEditedTodoIsDoneCursor: f.ICursor<boolean> = {
    key: 'todoSection.todoSection.editedTodo.isDone'
}

export let todoSectionEditedTodoNameCursor: f.ICursor<string> = {
    key: 'todoSection.todoSection.editedTodo.name'
}
