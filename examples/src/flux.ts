import * as f from "../../index";

export * from '../../index';

export const createUpdateAction = <TParams>(cursor: f.ICursor<f.IState> | f.ICursorFactory<f.IState, TParams>, postHandler?: (state, paraams: TParams) => f.IState) =>
    f.createAction<f.IState, TParams>(cursor, (state, params: TParams) => {
        return postHandler
            ? postHandler(f.shallowCopy(state, l => {
                Object.keys(params).forEach(p => {
                    l[p] = params[p];
                });
            }), params)
            : f.shallowCopy(state, l => {
                Object.keys(params).forEach(p => {
                    l[p] = params[p];
                });
            });
    });
