import * as b from '../node_modules/bobril/index';
import { ICursor, IContext, createComponent } from '../node_modules/bobflux/dist/src/index';
import * as states from './states';
import * as actions from './actions';
import inlineForm from './bootstrap/inlineForm';
import checkbox from './bootstrap/checkbox';
import button from './bootstrap/button';

interface ICtx extends IContext<states.ITodo[]> {
}

export default createComponent({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        me.children = [
            ctx.state.map(t => inlineForm({
                content: [
                    checkbox({
                        label: t.name,
                        value: t.isComplete,
                        onChanged: (value: boolean) => actions.changeCompletion({ id: t.id, completed: value })
                    }),
                    button({ label: 'Delete', onClick: () => { actions.removeTodo(t.id); return true; } })
                ]
            }))
        ];
    }
});
