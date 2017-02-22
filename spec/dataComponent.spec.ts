import * as b from 'bobril';
import * as bf from '../index';
import * as c from '../src/dataComponent';

describe('dataComponent', () => {

    beforeEach(() => {
        bf.bootstrap({ value: 'defaultValue' }, {});
        jasmine.clock().install();
    })

    afterEach(() => {
        jasmine.clock().uninstall();
    })

    describe('context', () => {
        it('has current state', (done: Function) => {
            let factory = c.createDataComponent<IState, {}>({
                render(ctx: ICtx) {
                    expect(ctx.state).toBe('defaultValue');
                    done();
                }
            })({ key: 'value' });

            init(factory({}));
        })
        
        it('has data', (done: Function) => {
            let factory = c.createDataComponent<IState, string>({
                render(ctx: ICtx) {
                    expect(ctx.data).toBe('dataValue');
                    done();
                }
            })({ key: 'value' });

            init(factory('dataValue'));
        })
    })
    
    describe('render', () => {
        it('is invoked on state change', (done: Function) => {
            let cursor = { key: 'value' };
            let renderedStates: IState[] = [];
            let factory = c.createDataComponent<IState, string>({
                render(ctx: ICtx) {
                    renderedStates = [...renderedStates, ctx.state];
                }
            })(cursor);

            new Promise((f) => {
                init(factory('defaultValue'));
                f();
            }).then(() => {
                expect(renderedStates).toEqual(['defaultValue']);
                invalidate();
            }).then(() => {
                expect(renderedStates).toEqual(['defaultValue', 'defaultValue']);
                bf.createAction(cursor, () => { return 'newValue'} )();
                tick();
            }).then(() => {
                expect(renderedStates).toEqual(['defaultValue', 'defaultValue', 'newValue']);
                done();
            }).catch((e) => {
                console.log('Unexpected error', e);
                done();
            })
        })
    })

    function init(childs: b.IBobrilChildren) {
        b.init(() => childs);
        tick();
    }

    function invalidate() {
        b.invalidate();
        tick();
    }

    function tick() {
        jasmine.clock().tick(50);
    }
})

interface ICtx extends bf.IContext<IState> {
}

interface IState extends bf.IState {
    value: string
}