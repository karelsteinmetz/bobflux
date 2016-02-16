import * as s from './state';
import * as f from '../flux';

export const rootCursor: f.ICursor<s.IWhatNextState> = {
    key: 'whatNext'
}

export const sourcesCursor: f.ICursor<s.IBobrilSource[]> = {
    key: 'whatNext.sources'
}
