import * as b from 'bobril';
import * as gui from 'bobril-css-bootstrap';
import * as f from './flux';
import * as s from './states';
import * as a from './actions';


export let create = f.createRouteComponent<s.ITodosState, any>({
    render(ctx: f.IContext<s.ITodosState>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = gui.table({
            headers: [],
            rows: ctx.state.todos.map(t => [gui.checkboxInput({ value: t.isDone, onChange: (v) => a.changeDoneStatus({ id: t.id, isDone: v }) }), t.name])
        });
    }
})