import * as f from "../../index";

export * from "../../index";

export const createUpdateAction = <TState extends f.IState, TParams>(
    cursor: f.ICursor<TState> | f.ICursorFactory<TState, TParams>,
    postHandler?: (state: TState, params?: TParams) => TState
) => f.createAction<TState, TParams>(cursor, (state: TState, params: TParams) => {
    return postHandler
        ? postHandler(f.shallowCopy(state, l => {
            Object.keys(params).forEach(p => {
                (<any>l)[p] = (<any>params)[p];
            });
        }), params)
        : f.shallowCopy(state, l => {
            Object.keys(params).forEach(p => {
                (<any>l)[p] = (<any>params)[p];
            });
        });
});
