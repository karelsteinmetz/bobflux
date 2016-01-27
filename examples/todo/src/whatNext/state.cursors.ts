import * as s from './state';
import * as f from '../flux';

export let rootCursor: f.ICursor<s.IWhatNextState> = {
    key: 'whatNext'
}

export let sourcesCursor: f.ICursor<s.IBobrilSource[]> = {
    key: 'whatNext.sources'
}
