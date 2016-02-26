import * as b from 'bobril';
import * as gui from 'bobril-css-bootstrap';
import * as f from '../flux';
import * as s from './state';
import * as c from './state.cursors';
import * as a from './actions';


export let create = f.createRouteComponent<s.ITodosState, any>({
    render(ctx: f.IContext<s.ITodosState>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = [
            addForm(c.editedTodoCursor),
            table(c.todosCursor)
        ];
    }
})

let addForm = f.createComponent<s.ITodo>({
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

let table = f.createComponent<s.ITodo[]>({
    render(ctx: f.IContext<s.ITodo[]>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = gui.table({
            headers: [],
            rows: ctx.state.map(t => {
                return {
                    columns: [gui.checkboxInput({ value: t.isDone, onChange: (v) => a.changeDoneStatus({ id: t.id, isDone: v }) }), t.name]
                };
            })
        });
    }
})