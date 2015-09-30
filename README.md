# Bobflux
* pure functional implementation of FLUX architecture
* frontend architecture inspired by [Flux](https://facebook.github.io/flux/docs/overview.html#content), [Reflux](https://github.com/spoike/refluxjs) and [Redux](https://github.com/gaearon/redux)
* fitted and dependent on [Bobril](https://github.com/Bobris/Bobril)

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
* Bobril is there only for "rendering" (View)
* Bobril component context should be used for intermediate state (drag & drop, input border color when it has been focused)

 ![](./doc/img/flux_like.png)

## Actions
* returns new instances of modified state and its sub states
* beware on array operations like push etc.
* use as much as possible specific cursors
* if you want to modify more sub states then you should rather create two actions with specified cursors. Then invoke actions synchronously. b.invalidate waits for both actions. If actions take a long time then will be rendered intermediate state between actions.
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
