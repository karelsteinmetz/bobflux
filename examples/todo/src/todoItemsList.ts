import * as b from '../node_modules/bobril/index';
import * as f from './flux';
import { ICursor } from './flux';
import * as states from './states';
import * as actions from './actions';
import inlineForm from './bootstrap/inlineForm';
import checkbox from './bootstrap/checkbox';
import button from './bootstrap/button';

export interface ICtx extends f.IContext<states.ITodo[]> {
}

export default f.createComponent({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        me.children = [
            ctx.state.map(t => inlineForm({
                content: [
                    checkbox({
                        label: t.name,
                        value: t.isComplete,
                        onChange: (value: boolean) => actions.changeCompletion({ id: t.id, completed: value })
                    }),
                    button({ label: 'Delete', onClick: () => { actions.removeTodo(t.id); return true; } })
                ]
            }))
        ];
    }
});
