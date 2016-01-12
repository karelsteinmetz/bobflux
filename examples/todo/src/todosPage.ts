import * as b from 'bobril';
import * as f from './flux';
import * as s from './states';


export let create = f.createRouteComponent<s.ITodosState, any>({
    render(ctx: f.IContext<s.ITodosState>, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = "Flux TODOs example";
    }
})