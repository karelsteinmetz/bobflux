import * as s from '../src/states';
import * as f from '../src/flux';
import * as td from '../src/todos/state';
import * as tdBuilders from './todos/state.builders';
import * as wn from '../src/whatNext/state';
import * as wnBuilders from './whatNext/state.builders';

export class ApplicationStateBuilder {
    private state: s.IApplicationState = s.createDefaultApplicationState();

    public withTodos(todos: td.ITodosState | tdBuilders.TodosStateBuilder): ApplicationStateBuilder {
        this.state.todos = tdBuilders.isTodosStateBuilder(todos) ? todos.build() : todos;
        return this;
    };

    public withWhatNext(whatNext: wn.IWhatNextState | wnBuilders.WhatNextStateBuilder): ApplicationStateBuilder {
        this.state.whatNext = wnBuilders.isWhatNextStateBuilder(whatNext) ? whatNext.build() : whatNext;
        return this;
    };

    public build(): s.IApplicationState {
        return this.state;
    }
    
    public buildToStore(): s.IApplicationState {
        f.bootstrap(this.state);
        return this.state;
    }
}

export function isApplicationStateBuilder(obj: s.IApplicationState | ApplicationStateBuilder): obj is ApplicationStateBuilder {
    return 'build' in obj;
}
