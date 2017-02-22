import * as b from "bobril";
import * as m from "bobril-m";
import * as fg from "bobril-flexbox-grid";
import * as f from "../flux";
import * as s from "./state";


export const createWhatNextPage = f.createRouteComponent<s.IWhatNextState, any>({
    render(ctx: f.IContext<s.IWhatNextState>, me: b.IBobrilNode) {
        me.children = ctx.state.sources.map(bs => m.Paper({
            children: [
                fg.Row({
                    center: fg.ModificatorType.xs,
                    children: fg.Col({
                        md: 10,
                        children: { tag: "h3", children: bs.name }
                    })
                }),
                fg.Row({
                    center: fg.ModificatorType.xs,
                    children: fg.Col({
                        md: 10,
                        children: bs.description
                    })
                })
            ]
        }));
    }
})

