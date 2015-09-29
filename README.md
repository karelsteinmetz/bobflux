# Bobflux
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
* Bobril is there only for "rendering" (View)
* Bobril component context should be used for intermediate state (drag & drop, input border color when is has been focused)

 ![](./doc/img/flux_like.png)

## Actions
* returns new instance of modified state and substates
* beware on array operations like push etc.
* use as much as possible specific cursors
* if you want to modify more substates then you would rather create two actions with specified cursors
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

## Component
* is derived component from Bobril
* implements shouldChnage
* gets state through cursor
* sets state in our context if it has been changed
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
