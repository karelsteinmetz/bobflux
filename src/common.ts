import * as f from "fun-model";

export type CursorFieldsMap<TState extends f.IState> = { [ctxFieldName: string]: f.ICursor<TState> };

export function isCursor<TState extends f.IState>(obj: f.ICursor<TState> | CursorFieldsMap<TState>): obj is f.ICursor<TState> {
    return "key" in obj;
}

export function unifyStateName(prefix: string): string {
    return prefix === "" ? "state" : prefix + "State";
}

export function unifyCursorName(prefix: string): string {
    return prefix === "" ? "cursor" : prefix + "Cursor";
}
