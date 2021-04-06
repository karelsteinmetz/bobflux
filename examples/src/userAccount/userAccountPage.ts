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
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.children = [createFields(ctx), createButtons(ctx)];
    },
});

function createFields(ctx: ICtx) {
    return [
        fg.Row({
            children: fg.Col({
                md: 12,
                children: m.TextField({
                    disabled: !ctx.state.isEditingEnabled,
                    labelText: g.t("E-mail:"),
                    hintText: g.t("Write your e-mail."),
                    onChange: (value) =>
                        a.updateEditedUserInfo({
                            email: value,
                        }),
                    value:
                        ctx.state.isEditingEnabled && ctx.state.editedUserInfo ? ctx.state.editedUserInfo.email : ctx.userInfoState.email,
                }),
            }),
        }),
        fg.Row({
            children: [
                fg.Col({
                    md: 6,
                    children: m.TextField({
                        disabled: !ctx.state.isEditingEnabled,
                        labelText: g.t("Name:"),
                        hintText: g.t("Write your name."),
                        onChange: (value) =>
                            a.updateEditedUserInfo({
                                name: value,
                            }),
                        value:
                            ctx.state.isEditingEnabled && ctx.state.editedUserInfo ? ctx.state.editedUserInfo.name : ctx.userInfoState.name,
                    }),
                }),
                fg.Col({
                    md: 6,
                    children: m.TextField({
                        disabled: !ctx.state.isEditingEnabled,
                        labelText: g.t("Surname:"),
                        hintText: g.t("Write your surname."),
                        onChange: (value) =>
                            a.updateEditedUserInfo({
                                surname: value,
                            }),
                        value:
                            ctx.state.isEditingEnabled && ctx.state.editedUserInfo
                                ? ctx.state.editedUserInfo.surName
                                : ctx.userInfoState.surName,
                    }),
                }),
            ],
        }),
    ];
}

function createButtons(ctx: ICtx) {
    return b.withKey(
        fg.Row({
            children: fg.Col({
                xsOffset: 10,
                children: [
                    !ctx.state.isEditingEnabled &&
                        b.withKey(
                            m.Button({
                                disabled: !!ctx.state.editedUserInfo,
                                type: m.ButtonType.Raised,
                                feature: ctx.state.editedUserInfo ? m.Feature.Secondary : m.Feature.Primary,
                                children: g.t("Edit"),
                                action: () => {
                                    a.enableEditing(ctx.userInfoState);
                                },
                            }),
                            "edit"
                        ),
                    ctx.state.isEditingEnabled &&
                        b.withKey(
                            m.Button({
                                type: m.ButtonType.Raised,
                                feature: ctx.state.editedUserInfo ? m.Feature.Secondary : m.Feature.Primary,
                                children: g.t("Submit"),
                                action: () => {
                                    a.submit(ctx.state.editedUserInfo);
                                },
                            }),
                            "submit"
                        ),
                    b.withKey(
                        m.Button({
                            disabled: !ctx.state.isEditingEnabled,
                            type: m.ButtonType.Raised,
                            feature: !ctx.state.editedUserInfo ? m.Feature.Secondary : m.Feature.Primary,
                            children: g.t("Cancel"),
                            action: () => {
                                a.closeEditing();
                            },
                        }),
                        "cancel"
                    ),
                ],
            }),
        }),
        "buttons"
    );
}
