import * as b from '../../node_modules/bobril/index';

export interface IData {
    value: string;
    onChange: (v: string) => void;
    placeHolder?: string;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export default b.createComponent({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'input';
        me.className = 'form-control';
        me.attrs = {
            value: ctx.data.value,
            placeholder: ctx.data.placeHolder && ctx.data.placeHolder
        }
    },
    onChange(ctx: ICtx, v: string) {
        ctx.data.onChange(v);
    }
});
