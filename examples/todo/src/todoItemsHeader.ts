import * as b from '../node_modules/bobril/index';
import { ICursor, IContext, createComponent } from '../node_modules/bobflux/dist/index';
import * as states from './states';
import * as actions from './actions';
import * as cursors from './cursors';
import inlineForm from './bootstrap/inlineForm';
import formGroup from './bootstrap/formGroup';
import input from './bootstrap/input';
import button from './bootstrap/button';

interface ICtx extends IContext<states.ITodo> {
}

export default createComponent({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        me.children = inlineForm({
            content: [
                formGroup({
                    content: [
                        // { tag: 'label', children: ctx.data.label, className: 'sr-only' },
                        { tag: 'label', children: 'Name:' },
                        input({ name: ctx.state.name, onChange: (value: string) => actions.updateEditedTodoName(value), placeHolder: 'Name' }),
                    ]
                }),
                button({ label: 'Add', onClick: () => { actions.addTodo(ctx.state.name); return true } })
            ]
        })
    }
});
