import * as b from '../node_modules/bobril/index';
import { ICursor, IContext, createComponent } from '../node_modules/bobflux/dist/src/index';
import * as states from './states';

interface ICtx extends IContext<states.ITodo[]> {
}

export default createComponent({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        let count = ctx.state.filter(t => !t.isComplete).length
        me.children = count === 0
            ? 'no items left'
            : `${count} item${count > 1 && 's'} left`
    }
});
