import * as b from 'bobril';
import * as bf from '../index';
import * as c from '../src/routeComponent';

describe('routeComponent', () => {
    let valueCursor = { key: 'value' };

    beforeEach(() => {
        bf.bootstrap({ value: 'default' }, {});
        jasmine.clock().install();
    })

    afterEach(() => {
        jasmine.clock().uninstall();
    })

    describe('context', () => {
        it('has current state', (done: Function) => {
            let factory = c.createRouteComponent<IState, c.IRouteData>({
                render(ctx: ICtx) {
                    expect(ctx.state).toBe('default');
                    done();
                }
            })(valueCursor);

            init(factory(aRouteParams('routeParam')));
        })

        it('has route data', (done: Function) => {
            let factory = c.createRouteComponent<IState, c.IRouteData>({
                render(ctx: ICtx) {
                    expect(ctx.data).toEqual({ routeParams: { routeParam: 'routeParam' } });
                    done();
                }
            })(valueCursor);

            init(factory(aRouteParams('routeParam')));
        })
    })

    describe('init', () => {
        it('sets state into context', (done: Function) => {
            let factory = c.createRouteComponent<IState, c.IRouteData>({
                render(ctx: ICtx) {
                    expect(ctx.state).toBe('default');
                    done();
                }
            })(valueCursor);

            init(factory(aRouteParams('routeParam')));
        })
    })

    describe('render', () => {
        it('is invoked on state change', (done: Function) => {
            let cursor = { key: 'value' };
            let renderStates: IState[] = [];
            let factory = c.createRouteComponent<IState, c.IRouteData>({
                render(ctx: ICtx) {
                    renderStates = [...renderStates, ctx.state];
                }
            })(valueCursor);

            new Promise((f) => {
                init(factory(aRouteParams()));
                f();
            }).then(() => {
                expect(renderStates).toEqual(['default']);
                bf.createAction(cursor, () => { return 'newValue' })();
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
    
    function aRouteParams(paramValue: string = 'aRouteParam'): bf.IRouteData {
        return { routeParams: { routeParam: paramValue } };
    }

    function init(childs: b.IBobrilChildren) {
        b.init(() => childs);
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