import * as b from '../../node_modules/bobril/index';

export interface IData {
    content: b.IBobrilNode;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export default b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        me.className = 'container';
        me.children = ctx.data.content;
    }
})
