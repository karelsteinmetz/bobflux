import * as b from 'bobril';
import * as bf from '../index';
import * as c from '../src/component';

describe('component', () => {

    beforeEach(() => {
        bf.bootstrap({ value: 'default' });
        jasmine.clock().install();
    })

    afterEach(() => {
        jasmine.clock().uninstall();
    })

    describe('context', () => {
        it('has current state', (done) => {
            const factory = c.createComponent<IState>({
                render(ctx: ICtx, me: b.IBobrilNode) {
                    expect(ctx.state).toBe('default');
                    done();
                }
            });

            init(factory({ key: 'value' })());
        })
    })

    describe('init', () => {
        it('sets state to context', (done) => {
            let renderState = null;
            let factory = c.createComponent<IState>({
                render(ctx: ICtx, me: b.IBobrilNode) {
                    expect(ctx.state).toBe('default');
                    done();
                }
            });

            init(factory({ key: 'value' })());
        })
    })

    describe('render', () => {
        it('is invoked on state change', (done) => {
            let cursor = { key: 'value' };
            let renderStates = [];
            let factory = c.createComponent<IState>({
                render(ctx: ICtx, me: b.IBobrilNode) {
                    renderStates = [...renderStates, ctx.state];
                }
            });

            new Promise((f, r) => {
                init(factory(cursor)());
                f();
            }).then(() => {
                expect(renderStates).toEqual(['default']);
                invalidate();
            }).then(() => {
                expect(renderStates).toEqual(['default']);
                bf.createAction(cursor, (s) => { return 'newValue'} )();
                tick();
            }).then(() => {
                expect(renderStates).toEqual(['default', 'newValue']);
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