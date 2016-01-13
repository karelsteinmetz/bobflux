# Bobflux
* is pure functional implementation of FLUX architecture
* is inspired by [Flux](https://facebook.github.io/flux/docs/overview.html#content), [Reflux](https://github.com/spoike/refluxjs) and [Redux](https://github.com/gaearon/redux)
* fits and depends on [Bobril](https://github.com/Bobris/Bobril)

## Installation
```
npm i bobflux --save
```

## Fun-model
* is core of bobflux,
* is not dependent on bobril, can be used for React applications,
* there is [fun-model](https://github.com/karelsteinmetz/fun-model/blob/master/README.md) you can see some notes about flux, immutability etc.

## Common keywords in Bobflux application
* one store for one application state
* application state:
 * is global state
 * is composition of sub states
 * actions are create by action factory with specified cursor and handler. Handler creates new instance of state or it can return the same state
* Bobril is only for "rendering" (View)
* Bobril component context (b.IBobrilCtx) should be used for intermediate state (drag & drop, input border color on focus etc.)

## Livecycle
 ![](./doc/img/flux_like.png)

### Getting started video [cz] 
[![Getting started video](http://img.youtube.com/vi/iU8_5aKHURM/default.jpg)](http://www.youtube.com/watch?v=iU8_5aKHURM)

## State
* is object
* is global state of application
* one instance is held in store
* default state must be set before firts usage

```js
//state.ts
import * as f from 'bobflux';

export interface ITodo {
    id: number;
    isDone: boolean;
    name: string;
}

export interface ITodosState extends f.IState {
    editedTodo: ITodo;
    todos: ITodo[];
}
```

```js
//app.ts - main application file in bobril-build or systemjs
import * as f from 'bobflux';
import * as s from './states';

f.bootstrap(s.default());
```

## Actions
* returns new instances of modified state and its sub states
* beware on array operations like push etc.
* use as much as possible specific cursors
* if you want to modify more sub states then you should create two actions with specified cursors. Then invoke actions synchronously. b.invalidate waits for both actions. If actions take a long time then intermediate state will be rendered between actions.

### Common
* implementation:
```js
export let removeTodo = bobflux.createAction(
    cursors.todos,
    (todos: states.ITodo[], id: number): states.ITodo[]=> {
        return [...todos.filter(t => t.id !== id)];
    }
);
```
* invoking:
```js
actions.removeTodo(t.id);
```

### Without parameters
* implementation:
```js
export let removeStaticTodo = bobflux.createAction(
    cursors.todos,
    (todos: states.ITodo[]): states.ITodo[]=> {
        return [...todos.filter(t => t.id !== 1)];
    }
);
```
* invoking:
```js
actions.removeStaticTodo();
```

### With more parameters
* implementation:
```js
export interface IChangeCompletionParams {
    id: number;
    completed: boolean;
}
export let changeCompletion = bobflux.createAction(
   cursors.todos,
   (todos: states.ITodo[], params: IChangeCompletionParams): states.ITodo[] => {
    return todos.map(t => {
        if (t.id === params.id)
            return bobflux.shallowCopy(t, (nT) => {
                nT.isComplete = params.completed;
                return nT;
            });
        return t;
    })
});
```
* invoking:
```js
 actions.changeCompletion({ id: t.id, completed: value })
```

### Issues
* beware on invoking because params of actions are optional!!! Compiler cannot check this mistake.

## Component
* is derived component from Bobril
* implements shouldChnage
* gets state through cursor
* sets last state in our context
* shouldChange implementation:
```js
shouldChange(ctx: IContext<IState>, me: b.IBobrilNode, oldMe: b.IBobrilCacheNode): boolean {
    let currentState = getState(c);
    if (currentState === ctx.state)
        return false;
    ctx.state = currentState;
    return true;
}
```
* component implementation:
```js
export let create = bobflux.createComponent({
    render(ctx: IContext, me: b.IBobrilNode) {
      //...
    }
}}
```
* invoking:
```js
todoItemsHeader.create(cursors.editedTodo, {}),
```

## Route component
* is virtual component with bobflux component in children
* bobflux component cannot be used in router beacause you can not specify cursor. Creation is invoked by router.