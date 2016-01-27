import * as s from './states';
import * as f from './flux';
import * as td from './todos/state';

export let appCursor: f.ICursor<s.IApplicationState> = f.rootCursor

export let todoSectionCursor: f.ICursor<td.ITodosState> = {
    key: 'todoSection'
}
