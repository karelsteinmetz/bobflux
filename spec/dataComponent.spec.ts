import * as b from 'bobril';
import * as bf from '../index';
import * as c from '../src/dataComponent';

describe('dataComponent', () => {

    beforeEach(() => {
        bf.bootstrap({ value: 'defaultValue' }, {});
    })

    afterEach(() => {
        init(undefined);
    })

    describe('context', () => {
        it('has current state', (done: () => void) => {
            let factory = c.createDataComponent<IState, {}>({
                render(ctx: ICtx) {
                    expect(ctx.state).toBe('defaultValue');
                    b.asap(done);
                }
            })({ key: 'value' });

            init(factory({}));
        })

        it('has data', (done: () => void) => {
            let factory = c.createDataComponent<IState, string>({
                render(ctx: ICtx) {
                    expect(ctx.data).toBe('dataValue');
                    b.asap(done);
                }
            })({ key: 'value' });

            init(factory('dataValue'));
        })
    })

    describe('render', () => {
        it('is invoked on state change', () => {
            let cursor = { key: 'value' };
            let renderedStates: IState[] = [];
            let factory = c.createDataComponent<IState, string>({
                render(ctx: ICtx) {
                    renderedStates = [...renderedStates, ctx.state];
                }
            })(cursor);

            init(factory('defaultValue'));
            expect(renderedStates).toEqual(['defaultValue']);
            invalidate();
            expect(renderedStates).toEqual(['defaultValue', 'defaultValue']);
            bf.createParamLessAction(cursor, () => { return 'newValue' })();
            b.syncUpdate();
            expect(renderedStates).toEqual(['defaultValue', 'defaultValue', 'newValue']);
        })
    })

    function init(children: b.IBobrilChildren) {
        b.init(() => children);
        b.syncUpdate();
    }

    function invalidate() {
        b.invalidate();
        b.syncUpdate();
    }
})

interface ICtx extends bf.IContext<IState> {
}

interface IState extends bf.IState {
    value: string
}
