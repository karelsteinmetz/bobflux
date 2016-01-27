import * as s from './state';
import * as f from '../flux';

export let editedTodoCursor: bf.ICursor<s.ITodo> = {
    key: 'todoSection.editedTodo'
}

export let todosCursor: bf.ICursor<s.ITodo[]> = {
    key: 'todoSection.todos'
}

export let todoSectionEditedTodoIdCursor: bf.ICursor<number> = {
    key: 'todoSection.todoSection.editedTodo.id'
}

export let todoSectionEditedTodoIsDoneCursor: bf.ICursor<boolean> = {
    key: 'todoSection.todoSection.editedTodo.isDone'
}

export let todoSectionEditedTodoNameCursor: bf.ICursor<string> = {
    key: 'todoSection.todoSection.editedTodo.name'
}
