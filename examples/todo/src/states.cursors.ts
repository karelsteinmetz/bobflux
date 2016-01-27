import * as s from './states';
import * as f from './flux';
import * as td from './todos/state';
import * as wn from './whatNext/state';

export let rootCursor: f.ICursor<s.IApplicationState> = f.rootCursor

export let todosCursor: f.ICursor<td.ITodosState> = {
    key: 'todos'
}

export let whatNextCursor: f.ICursor<wn.IWhatNextState> = {
    key: 'whatNext'
}
