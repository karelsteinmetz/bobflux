import * as f from "fun-model";
export declare type CursorFieldsMap<TState extends f.IState> = {
    [ctxFieldName: string]: f.ICursor<TState>;
};
export declare function isCursor<TState extends f.IState>(obj: f.ICursor<TState> | CursorFieldsMap<TState>): obj is f.ICursor<TState>;
export declare function unifyStateName(prefix: string): string;
export declare function unifyCursorName(prefix: string): string;
