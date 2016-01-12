# Bobflux
* is pure functional implementation of FLUX architecture
* is frontend architecture inspired by [Flux](https://facebook.github.io/flux/docs/overview.html#content), [Reflux](https://github.com/spoike/refluxjs) and [Redux](https://github.com/gaearon/redux)
* fits and depends on [Bobril](https://github.com/Bobris/Bobril)

## Installation
```
npm i bobflux --save
```

## About Flux, Immutability and Shallow Copy
* you can see some notes: [fun-model](https://github.com/karelsteinmetz/fun-model/blob/master/README.md)


## Common keywords
* one store for one application state
* application state:
 * is global state
 * is composition of sub states
 * action calls action factory with specified cursor and handler. Handler creates new instance of state
* Bobril is only for "rendering" (View)
* Bobril component context should be used for intermediate state (drag & drop, input border color when it has been focused)

 ![](./doc/img/flux_like.png)

### Getting started video [cz] 
[![Getting started video](http://img.youtube.com/vi/iU8_5aKHURM/default.jpg)](http://www.youtube.com/watch?v=iU8_5aKHURM)


## Best Practices
* don't pass functions as action parameters
* if action has parameters then declare state and params like this:
```js
bobflux.createAction<states.ITodo[], IChangeCompletionParams>(cursors.todos, (todos, params) => { return state; )
```

## Actions
* returns new instances of modified state and its sub states
* beware on array operations like push etc.
* use as much as possible specific cursors
* if you want to modify more sub states then you should create two actions with specified cursors. Then invoke actions synchronously. b.invalidate waits for both actions. If actions take a long time then intermediate state will be rendered between actions.
* don't pass functions as action parameters

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
export let changeCompletion = bobflux.createAction<states.ITodo[], IChangeCompletionParams>(
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