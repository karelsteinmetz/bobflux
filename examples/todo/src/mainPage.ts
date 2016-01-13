import * as b from 'bobril';
import * as gui from 'bobril-css-bootstrap';

export let create = b.createComponent({
    postInitDom(ctx: b.IBobrilCtx, me: b.IBobrilCacheNode, element: HTMLElement) {
        let link = document.createElement('link');
        link.href = "./css/bootstrap.css";
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen,print";
        document.getElementsByTagName("head")[0].appendChild(link);
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
