/// <reference path="./jasmine"/>
import { shallowCopy } from '../src/helpers';

describe('helpers', () => {
    describe('shallowCopy', () => {
        let aState;

        beforeEach(() => {
            aState = {
                id: 'anId',
                list: [1, 2, 3],
                subObject: {
                    id: 'anSubId'
                }
            };
        });

        it('copies all values', () => {
            let newState = shallowCopy(aState);

            expect(newState.id).toBe(aState.id);
            expect(newState.subObject.id).toBe(aState.subObject.id);
            expect(newState.list.length).toBe(aState.list.length);
        });

        it('returns new object', () => {
            let newState = shallowCopy(aState);

            expect(newState).not.toBe(aState);
        });

        it('returns original sub objects', () => {
            let newState = shallowCopy(aState);

            expect(newState.subObject).toBe(aState.subObject);
            expect(newState.list).toBe(aState.list);
        });
    });
});
