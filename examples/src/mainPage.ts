import * as b from "bobril";
import * as m from "bobril-m";
import * as g from "bobril-g11n";
import * as fg from "bobril-flexbox-grid";

export const createMainPage = b.createComponent({
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        me.children = [
            m.Paper({
                children: [
                    fg.Row({
                        children: [
                            fg.Col({
                                md: 6,
                                children: m.Button({
                                    type: m.ButtonType.Raised,
                                    feature: b.isActive("todos") || b.isActive("default") ? m.Feature.Secondary : m.Feature.Primary,
                                    children: g.t("Todos"),
                                    action: () => { b.runTransition(b.createRedirectReplace("todos")); }
                                })
                            }),
                            fg.Col({
                                md: 6,
                                children: m.Button({
                                    type: m.ButtonType.Raised,
                                    feature: b.isActive("whatNext") ? m.Feature.Secondary : m.Feature.Primary,
                                    children: g.t("What next?"),
                                    action: () => b.runTransition(b.createRedirectReplace("whatNext"))
                                })
                            })
                        ]
                    }),

                ]
            }),
            m.Paper({
                children: me.data.activeRouteHandler()
            })
        ];
    }
});
