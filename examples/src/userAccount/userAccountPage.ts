import * as b from "bobril";
import * as m from "bobril-m";
import * as fg from "bobril-flexbox-grid";
import * as f from "../flux";
import * as s from "./userAccountPageStates";
import * as a from "./userAccountPageActions";


export const createWhatNextPage = f.createRouteComponent<s.IUserAccountPageState, f.IRouteData>({
    render(ctx: f.IRouteComponentContext<s.IUserAccountPageState, f.IRouteData>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = fg.Grid({
            fluid: true,
            children: fg.Row({
                children: ctx.state.editedUserInfo
                    ? b.withKey(fg.Col({
                        md: 12,
                        children: [
                            fg.Row({
                                center: fg.ModificatorType.xs,
                                children: fg.Col({
                                    md: 10,
                                    children: m.TextField({
                                        value: ctx.state.editedUserInfo.email,
                                        onChange: (v) => a.updateEditedUserInfo(v)
                                    })
                                })
                            }),
                            fg.Row({
                                center: fg.ModificatorType.xs,
                                children: [
                                    fg.Col({
                                        md: 6,
                                        children: m.TextField({
                                            value: ctx.state.editedUserInfo.name,
                                            onChange: (v) => a.updateEditedUserInfo(v)
                                        })
                                    }),
                                    fg.Col({
                                        md: 6,
                                        children: m.TextField({
                                            value: ctx.state.editedUserInfo.surName,
                                            onChange: (v) => a.updateEditedUserInfo(v)
                                        })
                                    })
                                ]
                            })
                        ]
                    }), "edit")
                    : b.withKey(fg.Col({
                        md: 12,
                        children: [
                            fg.Row({
                                center: fg.ModificatorType.xs,
                                children: fg.Col({
                                    md: 10,
                                    children: ctx.state.userInfo.email
                                })
                            }),
                            fg.Row({
                                center: fg.ModificatorType.xs,
                                children: [
                                    fg.Col({
                                        md: 6,
                                        children: ctx.state.userInfo.name
                                    }),
                                    fg.Col({
                                        md: 6,
                                        children: ctx.state.userInfo.surName
                                    })
                                ]
                            })
                        ]
                    }), "readOnly")
            })
        })
    }
})

