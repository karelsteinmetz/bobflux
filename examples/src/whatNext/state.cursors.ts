import * as s from './state';
import * as f from '../flux';

export const rootKey = 'whatNext';

export const rootCursor: f.ICursor<s.IWhatNextState> = {
    key: rootKey
}

export const sourcesCursor: f.ICursor<s.IBobrilSource[]> = {
    key: rootKey + '.sources'
}
