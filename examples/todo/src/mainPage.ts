import * as b from 'bobril';
import * as gui from 'bobril-css-bootstrap';

export let create = b.createComponent({
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        me.children = [
            gui.navBar({
                header: null,
                leftItems: [
                    { label: 'Todos', value: 'todos', onSelect: () => b.runTransition(b.createRedirectReplace('todos')) },
                    { label: 'What next?', value: 'whatNext', onSelect: () => b.runTransition(b.createRedirectReplace('whatNext')) }
                ]
            }),
            gui.container({ content: me.data.activeRouteHandler() })
        ];
    }
});
