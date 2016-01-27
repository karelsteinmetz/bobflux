import * as b from 'bobril';
import * as gui from 'bobril-css-bootstrap';
import * as f from '../flux';
import * as s from './state';
import * as c from './state.cursors';


export let create = f.createRouteComponent<s.IWhatNextState, any>({
    render(ctx: f.IContext<s.IWhatNextState>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = ctx.state.sources.map(bs => gui.panel({
            header: bs.name,
            contextualState: gui.ContextualState.info,
            content: bs.description
        }));
    }
})
