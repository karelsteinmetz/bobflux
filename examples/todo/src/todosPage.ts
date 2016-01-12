import * as b from 'bobril';
import * as f from './flux';

export let create = b.createComponent({
    render(ctx: b.IBobrilCtx, me: b.IBobrilNode, oldMe?: b.IBobrilCacheNode) {
        me.children = "I'm example";
    }
})