import * as b from "bobril";
import * as g from "bobril-g11n";
import * as m from "bobril-m";
import * as fg from "bobril-flexbox-grid";
import * as gui from "bobril-css-bootstrap";
import * as f from "../flux";
import * as s from "./state";
import * as c from "./state.cursors";
import * as a from "./actions";


export const createTodosPage = f.createRouteComponent<s.ITodosState, any>({
    render(ctx: f.IContext<s.ITodosState>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = fg.Grid({
            fluid: true,
            children: [
                fg.Row({
                    center: fg.ModificatorType.xs,
                    children: fg.Col({
                        md: 11,
                        children: addFormFactory()
                    })
                }),
                fg.Row({
                    center: fg.ModificatorType.xs,
                    children: fg.Col({
                        md: 11,
                        children: todosOverviewFactory()
                    })
                })
            ]
        });
    }
});

const createAddForm = f.createComponent<s.ITodo>({
    render(ctx: f.IContext<s.ITodo>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = m.Paper({
            children: fg.Row({
                middle: fg.ModificatorType.xs,
                children: [
                    fg.Col({
                        md: 8,
                        children: m.TextField({
                            value: ctx.state.name,
                            onChange: (v) => a.updateNewTodoName(v)
                        })
                    }),
                    fg.Col({
                        md: 4,
                        children: m.Button({
                            type: m.ButtonType.Raised,
                            feature: m.Feature.Primary,
                            children: g.t("Add"),
                            action: () => { a.addTodo() }
                        })
                    })
                ]
            })
        });
    }
});
const addFormFactory = createAddForm(c.editedTodoCursor);

const createTodosOverview = f.createComponent<s.ITodo[]>({
    render(ctx: f.IContext<s.ITodo[]>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = m.Paper({
            children: gui.table({
                headers: [],
                rows: ctx.state.map(t => {
                    return {
                        columns: [gui.checkboxInput({ value: t.isDone, onChange: (v) => a.changeDoneStatus({ id: t.id, isDone: v }) }), t.name]
                    };
                })
            })
        })
    }
});
const todosOverviewFactory = createTodosOverview(c.todosCursor);