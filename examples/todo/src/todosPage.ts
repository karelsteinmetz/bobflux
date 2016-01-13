import * as b from 'bobril';
import * as gui from 'bobril-css-bootstrap';
import * as f from './flux';
import * as s from './states';
import * as a from './actions';
import * as c from './cursors';


export let create = f.createRouteComponent<s.ITodosState, any>({
    render(ctx: f.IContext<s.ITodosState>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = [
            addForm(c.editedTodo),
            table(c.todos)
        ];
    }
})

let addForm = f.createComponent<s.ITodo, any>({
    render(ctx: f.IContext<s.ITodo>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = gui.form({
            isInlined: true,
            content: [
                gui.inputFormField('', ctx.state.name, a.updateNewTodoName),
                gui.button({ label: 'Add', onClick: () => { a.addTodo(); return true; } })
            ]
        });
    }
})

let table = f.createComponent<s.ITodo[], any>({
    render(ctx: f.IContext<s.ITodo[]>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = gui.table({
            headers: [],
            rows: ctx.state.map(t => [gui.checkboxInput({ value: t.isDone, onChange: (v) => a.changeDoneStatus({ id: t.id, isDone: v }) }), t.name])
        });
    }
})