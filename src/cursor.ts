import { IState } from './state';

export interface ICursor<TState extends IState> {
    key: string;
};
