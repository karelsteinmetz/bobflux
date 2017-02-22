import * as b from "bobril";
import * as f from "./flux";
import * as s from "./states";

interface ICtx extends f.IContext<s.IUserInfo> {
}

export const createUserInfo = f.createComponent<s.IUserInfo>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.children = [
            { "tag": "h3", children: ctx.state.email, style: { padding: 5, margin: 0, textAlign: "right" } }
        ];
    }
});
