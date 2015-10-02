import * as b from 'node_modules/bobril/index';
import * as bobflux from 'node_modules/bobflux/dist/src/index';
import * as states from './states';
import * as guiFactory from './guiFactory';
import * as actions from './actions';

interface IContext extends bobflux.IContext<states.ITodo[]> {
}

export let create = bobflux.createComponent({
    render(ctx: IContext, me: b.IBobrilNode) {
        me.tag = 'div';
        me.children = [
            ctx.state.map(t => [
                guiFactory.createCheckbox(t.isComplete, (value: boolean) =>
                    actions.changeCompletion({ id: t.id, completed: value })
                ),
                { tag: 'div', children: t.name },
                guiFactory.createButton('Delete', () => { actions.removeTodo(t.id); return true; } )])
        ];
    }
});
