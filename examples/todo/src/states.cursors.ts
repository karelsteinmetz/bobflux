import * as s from './states';
import * as f from './flux';

export let appCursor: f.ICursor<s.IApplicationState> = f.rootCursor

export let todoSectionCursor: f.ICursor<s.ITodosState> = {
    key: 'todoSection'
}

export let todoSectionEditedTodoCursor: f.ICursor<s.ITodo> = {
    key: 'todoSection.editedTodo'
}

export let todoSectionTodosCursor: f.ICursor<s.ITodo[]> = {
    key: 'todoSection.todos'
}

export let todoSectionEditedTodoIdCursor: f.ICursor<number> = {
    key: 'todoSection.editedTodo.id'
}

export let todoSectionEditedTodoIsDoneCursor: f.ICursor<boolean> = {
    key: 'todoSection.editedTodo.isDone'
}

export let todoSectionEditedTodoNameCursor: f.ICursor<string> = {
    key: 'todoSection.editedTodo.name'
}
