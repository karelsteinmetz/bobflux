import * as bobflux from '../node_modules/bobflux/dist/index';
import * as states from './states';

export let todos: bobflux.ICursor<states.ITodo[]> = {
    key: 'todoSection.todos'
}

export let editedTodo: bobflux.ICursor<states.ITodo> = {
    key: 'todoSection.editedTodo'
}

export let editedTodoName: bobflux.ICursor<string> = {
    key: 'todoSection.editedTodo.name'
}
