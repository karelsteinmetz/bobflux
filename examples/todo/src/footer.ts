import * as b from '../node_modules/bobril/index';
import * as f from './flux';
import { ICursor } from './flux';
import * as states from './states';

interface ICtx extends f.IContext<states.ITodo[]> {
}

export default f.createComponent({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        let count = ctx.state.filter(t => !t.isComplete).length
        me.children = count === 0
            ? 'no items left'
            : `${count} item${count > 1 && 's'} left`
    }
});
