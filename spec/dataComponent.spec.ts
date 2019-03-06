import * as b from 'bobril';
import * as bf from '../index';
import * as c from '../src/dataComponent';

describe('dataComponent', () => {
    let valueCursor: bf.ICursor<string> = { key: 'value' };

    beforeEach(() => {
        bf.bootstrap({ value: 'defaultValue' }, {});
    })

    afterEach(() => {
        init(undefined);
    })

    describe('context', () => {
        it('has current state', (done: () => void) => {
            let factory = c.createDataComponent<string, {}>({
                render(ctx: bf.IContext<string>) {
                    expect(ctx.state).toBe('defaultValue');
                    b.asap(done);
                }
            })(valueCursor);

            init(factory({}));
        })

        it('has data', (done: () => void) => {
            let factory = c.createDataComponent<string, string>({
                render(ctx: ICtx) {
                    expect(ctx.data).toBe('dataValue');
                    b.asap(done);
                }
            })(valueCursor);

            init(factory('dataValue'));
        })
    })

    describe('render', () => {
        it('is invoked on state change', () => {
            let renderedStates: string[] = [];
            let factory = c.createDataComponent<string, string>({
                render(ctx: bf.IContext<string>) {
                    renderedStates = [...renderedStates, ctx.state];
                }
            })(valueCursor);

            init(factory('defaultValue'));
            expect(renderedStates).toEqual(['defaultValue']);
            invalidate();
            expect(renderedStates).toEqual(['defaultValue', 'defaultValue']);
            bf.createParamLessAction(valueCursor, () => { return 'newValue' })();
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
