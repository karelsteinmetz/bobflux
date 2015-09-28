# bobflux
* pure functional implementation of FLUX pattern.
* frontend architecture inspired by flux, reflux and redux.
* fitted and dependent on Bobril.

## Installation
```
npm i bobflux --save
```

## About Flux, Immutability and Shallow Copy
* see https://github.com/karelsteinmetz/fun-model/blob/master/README.md

## Common keywords
* one store for one application state
* application state:
 * is global state
 * is composition of substates
 * action calls action factory with specified cursor and handler which creates new instance of state
* Bobril is there only for rendering
* Bobril component context should be used for intermediate state (drag & drop, input border color when is has been focused)

 ![](./doc/img/flux_like.png)

## Actions
* every action returns new instance of modified state and substates
* beware on array operations like push etc.
* declaration:
```js
export let removeTodo = bobflux.createAction(cursors.todos, (todos: states.ITodo[], id: number): states.ITodo[]=> {
     return [...todos.filter(t => t.id !== id)];
});
```

* usage:
```js
actions.removeTodo(t.id);
```
