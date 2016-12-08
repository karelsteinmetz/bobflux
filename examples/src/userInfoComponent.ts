import * as b from "bobril";
import * as m from "bobril-m";
import * as g from "bobril-g11n";
import * as fg from "bobril-flexbox-grid";
import * as f from "./flux";
import * as s from "./states";
import * as c from "./states.cursors";

interface ICtx extends f.IContext<s.IUserInfo> {
}

export const createUserInfo = f.createComponent<s.IUserInfo>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.children = [
            { "tag": "h3", children: ctx.state.email, style: { padding: 5, margin: 0, textAlign: "right" } }
        ];
    }
});
