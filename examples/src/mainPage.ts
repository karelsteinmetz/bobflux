import * as b from "bobril";
import * as m from "bobril-m";
import * as g from "bobril-g11n";
import * as fg from "bobril-flexbox-grid";
import * as f from "./flux";
import * as s from "./states";
import * as a from "./mainPageActions";
import * as c from "./states.cursors";
import * as ui from "./userInfoComponent";
import * as tdp from "./todos/todosPage";
import * as wnp from "./whatNext/whatNextPage";
import * as ua from "./userAccount/userAccountPage";

interface ICtx extends f.IRouteComponentContext<s.IApplicationState, f.IRouteData> {
    userInfoFactory: f.IComponentFactory;
}

export const createMainPage = f.createRouteComponent<s.IApplicationState, f.IRouteData>({
    init(ctx: ICtx) {
        ctx.userInfoFactory = ui.createUserInfo(c.userInfoCursor);
    },
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.children = [
            m.Paper({
                children: [
                    fg.Row({
                        children: [
                            fg.Col({
                                md: 3,
                                children: m.Button({
                                    type: m.ButtonType.Raised,
                                    feature: b.isActive("todos") || b.isActive("default") ? m.Feature.Secondary : m.Feature.Primary,
                                    children: g.t("Todos"),
                                    action: () => { a.goTo("todos"); }
                                })
                            }),
                            fg.Col({
                                md: 3,
                                children: m.Button({
                                    type: m.ButtonType.Raised,
                                    feature: b.isActive("whatNext") ? m.Feature.Secondary : m.Feature.Primary,
                                    children: g.t("What next?"),
                                    action: () => a.goTo("whatNext")
                                })
                            }),
                            fg.Col({
                                md: 3,
                                children: m.Button({
                                    type: m.ButtonType.Raised,
                                    feature: b.isActive("userAccount") ? m.Feature.Secondary : m.Feature.Primary,
                                    children: g.t("Account"),
                                    action: () => a.goTo("userAccount")
                                })
                            }),
                            fg.Col({
                                md: 1,
                                children: []
                            }),
                            fg.Col({
                                md: 2,
                                children: ctx.userInfoFactory()
                            })
                        ]
                    }),

                ]
            }),
            m.Paper({
                children: fg.Row({
                    center: fg.ModificatorType.xs,
                    children: fg.Col({
                        md: 10,
                        children: me.data.activeRouteHandler()
                    })
                })
            })
        ];
    }
});

export function createRoutes(): b.IRoute[] {
    return [
        b.route({
            url: "/todos",
            name: "todos",
            handler: tdp.createTodosPage(c.todosCursor)
        }),
        b.route({
            url: "/whatNext",
            name: "whatNext",
            handler: wnp.createWhatNextPage(c.whatNextCursor)
        }),
        b.route({
            url: "/userAccount",
            name: "userAccount",
            handler: ua.createUserAccountPage({ 
                [f.defaultStateName]: c.userAccountCursor, 
                userInfo: c.userInfoCursor 
            })
        }),
        b.routeDefault({
            name: "default",
            handler: tdp.createTodosPage(c.todosCursor)
        })
    ]
}