import * as b from 'bobril';
import * as gui from 'bobril-css-bootstrap';

export let create = b.createComponent({
    id: 'body-style',
    postInitDom(ctx: b.IBobrilCtx, me: b.IBobrilCacheNode, element: HTMLElement) {
        document.body.style.minHeight = '200px';
        document.body.style.paddingTop = '70px';
    },
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode) {
        me.children = [
            gui.navBar({
                header: null,
                routes: [
                    { label: 'Todos', value: 'todos', onRoute: () => b.runTransition(b.createRedirectReplace('todos')) }
                ],
                activeRoute: 'todos',
                userName: '',
                onLogout: () => { return true; }
            }),
            gui.container({ content: me.data.activeRouteHandler(), isFluid: true })
        ];
    }
});
