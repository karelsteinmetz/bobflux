import * as b from "bobril";
import * as g from "bobril-g11n";
import * as m from "bobril-m";
import * as fg from "bobril-flexbox-grid";
import * as f from "../flux";
import * as s from "./userAccountPageStates";
import * as a from "./userAccountPageActions";

interface ICtx extends f.IRouteComponentContext<s.IUserAccountPageState, f.IRouteData> {
    userInfoCursor: f.ICursor<s.IUserInfo>;
    userInfoState: s.IUserInfo;
}

export const createUserAccountPage = f.createRouteComponent<s.IUserAccountPageState, f.IRouteData>({
    render(ctx: ICtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = [
            createFields(ctx),
            createButtons(ctx)
        ];
    }
})

function createFields(ctx: ICtx) {
    return [
        fg.Row({
            children: fg.Col({
                md: 12,
                children: m.TextField({
                    disabled: !ctx.state.isEditingEnabled,
                    // hintText: g.t("Email:"),
                    value: ctx.state.isEditingEnabled ? ctx.state.editedUserInfo.email : ctx.userInfoState.email
                })
            })
        }),
        fg.Row({
            children: [
                fg.Col({
                    md: 6,
                    children: m.TextField({
                        disabled: !ctx.state.isEditingEnabled,
                        // hintText: g.t("Name:"),
                        value: ctx.state.isEditingEnabled ? ctx.state.editedUserInfo.name : ctx.userInfoState.name
                    })
                }),
                fg.Col({
                    md: 6,
                    children: m.TextField({
                        disabled: !ctx.state.isEditingEnabled,
                        // hintText: g.t("Surname:"),
                        value: ctx.state.isEditingEnabled ? ctx.state.editedUserInfo.surName : ctx.userInfoState.surName
                    })
                })
            ]
        })
    ];
}

function createButtons(ctx: ICtx) {
    return b.withKey(fg.Row({
        children: fg.Col({
            xsOffset: 10,
            children: [
                m.Button({
                    disabled: !!ctx.state.editedUserInfo,
                    type: m.ButtonType.Raised,
                    feature: ctx.state.editedUserInfo ? m.Feature.Secondary : m.Feature.Primary,
                    children: g.t("Edit"),
                    action: () => { }
                }),
                m.Button({
                    disabled: !!ctx.state.editedUserInfo,
                    type: m.ButtonType.Raised,
                    feature: !ctx.state.editedUserInfo ? m.Feature.Secondary : m.Feature.Primary,
                    children: g.t("Cancel"),
                    action: () => { }
                })
            ]
        })
    }), "buttons");
}
