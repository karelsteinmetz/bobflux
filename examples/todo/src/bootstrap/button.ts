import * as b from '../../node_modules/bobril/index';

export interface IData {
    label: string;
    onClick: () => boolean;
    isDisabled? : boolean;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export default b.createComponent<IData>({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'button';
        me.className = 'btn btn-default';
        ctx.data.isDisabled && (me.className += ' disabled');
        me.children = ctx.data.label;
    },
    onClick(ctx: ICtx, event: b.IBobrilMouseEvent): boolean {
        return ctx.data.onClick();
    }
})
