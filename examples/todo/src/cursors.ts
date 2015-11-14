import * as f from './flux';
import * as states from './states';

export let todos: f.ICursor<states.ITodo[]> = {
    key: 'todoSection.todos'
}

export let editedTodo: f.ICursor<states.ITodo> = {
    key: 'todoSection.editedTodo'
}

export let editedTodoName: f.ICursor<string> = {
    key: 'todoSection.editedTodo.name'
}
