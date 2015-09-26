import * as b from 'node_modules/bobril/index';

export function shallowCopy<T>(obj: T, callback: (newObj: T) => T = (o: T) => { return o; }): T {
    return callback(<T>b.assign({}, obj));
};