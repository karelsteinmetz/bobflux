import * as f from 'bobflux';
import * as states from './states';

export let todosSection: f.ICursor<states.ITodosState> = {
    key: 'todoSection'
}

export let todos: f.ICursor<states.ITodo[]> = {
    key: 'todoSection.todos'
}

export let editedTodo: f.ICursor<states.ITodo> = {
    key: 'todoSection.editedTodo'
}

export let editedTodoName: f.ICursor<string> = {
    key: 'todoSection.editedTodo.name'
}
