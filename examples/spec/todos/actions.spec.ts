import * as b from 'bobril';
import * as f from '../../src/flux';
import * as a from '../../src/todos/actions';
import * as c from '../../src/todos/state.cursors';
import * as s from '../../src/todos/state';
import * as rs from '../../src/states';
import * as tb from './state.builders';
import * as rb from '../states.builders';

describe('actions', () => {
    beforeEach(() => {
        f.bootstrap(rs.createDefaultApplicationState());
    })

    describe('changeDoneStatus', () => {
        it('sets new done status for specified item', () => {
            givenStore({ id: 1, isDone: false, name: 'Todo' });

            a.changeDoneStatus({ id: 1, isDone: true });

            expect(f.getState(firstTodoCursor).isDone).toBeTruthy();
        })

        it('preserves done status for others', () => {
            givenStore({ id: 1, isDone: false, name: 'Todo 1' }, { id: 2, isDone: false, name: 'Todo 2' });

            a.changeDoneStatus({ id: 1, isDone: true });

            expect(f.getState(secondTodoCursor).isDone).toBeFalsy();
        })

        it('preserves names', () => {
            givenStore({ id: 1, isDone: false, name: 'Todo' });

            a.changeDoneStatus({ id: 1, isDone: true });

            expect(f.getState(firstTodoCursor).name).toBe('Todo');
        })
    })

    function givenStore(...todos: s.ITodo[]) {
        new tb.TodosStateBuilder()
                .withTodos(...todos)
            .buildToStore();
    }
})

const firstTodoCursor: f.ICursor<s.ITodo> = {
    key: 'todos.todos.0'
}

const secondTodoCursor: f.ICursor<s.ITodo> = {
    key: 'todos.todos.1'
}