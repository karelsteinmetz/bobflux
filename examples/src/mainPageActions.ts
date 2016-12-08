import * as b from "bobril";
import * as f from './flux';
import * as s from './states';
import * as c from './states.cursors';

export const goTo = f.createAction<s.IApplicationState, any>(c.rootCursor, (state, routeKey) => {
    b.runTransition(b.createRedirectReplace(routeKey));
    return f.shallowCopy(state);
});