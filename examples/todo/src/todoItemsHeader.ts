import * as b from 'node_modules/bobril/index';
import * as bobflux from 'node_modules/bobflux/dist/src/index';
import * as states from './states';
import * as guiFactory from './guiFactory';
import * as actions from './actions';


interface IContext extends bobflux.IContext<states.ITodo> {
}

export let create = bobflux.createComponent({
    render(ctx: IContext, me: b.IBobrilNode) {
        me.tag = 'div';
        me.children = [
            guiFactory.createInput(ctx.state.name, (value: string) => actions.updateEditedTodoName(value)),
            guiFactory.createButton('Add', () => { actions.addTodo(ctx.state.name); return true; })
        ];
    }
});
