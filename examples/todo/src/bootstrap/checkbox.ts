import * as b from '../../node_modules/bobril/index';

export interface IData {
    label: string;
    value: boolean;
    onValueChange: () => boolean;
    isDisabled?: boolean;
}

interface ICtx extends b.IBobrilCtx {
    data: IData;
}

export default b.createComponent({
    render(ctx: ICtx, me: b.IBobrilNode) {
        me.tag = 'div';
        me.className = 'checkbox';
        ctx.data.isDisabled && (me.className += ' disabled');
        me.children = {
            tag: 'label',
            children: [{
                tag: 'input',
                attrs: {
                    type: 'checkbox',
                    value: ctx.data.value,
                    disabled: ctx.data.isDisabled
                },
                component: {
                    onChange: (ctx: any, v: boolean) => ctx.data.onValueChange(v)
                }
            }, ctx.data.label]
        };
    }
})
