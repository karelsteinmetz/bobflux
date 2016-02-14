import * as s from './states';
import * as f from './flux';
import * as td from './todos/state';
import * as wn from './whatNext/state';

export const rootCursor: f.ICursor<s.IApplicationState> = f.rootCursor

export const todosCursor: f.ICursor<td.ITodosState> = {
    key: 'todos'
}

export const whatNextCursor: f.ICursor<wn.IWhatNextState> = {
    key: 'whatNext'
}
