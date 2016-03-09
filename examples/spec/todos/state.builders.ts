import * as s from '../../src/todos/state';
import * as f from '../../src/flux';

export class TodosStateBuilder {
    private state: s.ITodosState = s.createDefaultTodosState();

    public withEditedTodo(editedTodo: s.ITodo | TodoBuilder): TodosStateBuilder {
        this.state.editedTodo = isTodoBuilder(editedTodo) ? editedTodo.build() : editedTodo;
        return this;
    };

    public withTodos(...todos: (s.ITodo | TodoBuilder)[]): TodosStateBuilder {
        this.state.todos = todos.map(i => isTodoBuilder(i) ? i.build() : i);
        return this;
    };

    public build(): s.ITodosState {
        return this.state;
    }
    
    public buildToStore(): s.ITodosState {
        f.bootstrap({ todos: this.state });
        return this.state;
    }
}

export function isTodosStateBuilder(obj: s.ITodosState | TodosStateBuilder): obj is TodosStateBuilder {
    return 'build' in obj;
}

export class TodoBuilder {
    private state: s.ITodo = s.createDefaultTodo();

    public withId(id: number): TodoBuilder {
        this.state.id = id;
        return this;
    };

    public withIsDone(isDone: boolean): TodoBuilder {
        this.state.isDone = isDone;
        return this;
    };

    public withName(name: string): TodoBuilder {
        this.state.name = name;
        return this;
    };

    public build(): s.ITodo {
        return this.state;
    }
    
    public buildToStore(): s.ITodo {
        f.bootstrap({ todos: { editedTodo: this.state } });
        return this.state;
    }
}

export function isTodoBuilder(obj: s.ITodo | TodoBuilder): obj is TodoBuilder {
    return 'build' in obj;
}

