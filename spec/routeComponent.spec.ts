import * as b from 'bobril';
import * as bf from '../index';
import * as c from '../src/routeComponent';

describe('routeComponent', () => {
    let valueCursor = { key: 'value' };

    beforeEach(() => {
        bf.bootstrap({ value: 'default' }, {});
    })

    afterEach(() => {
        init(undefined);
    })

    describe('context', () => {
        it('has current state', (done: () => void) => {
            let factory = c.createRouteComponent<string, c.IRouteData>({
                render(ctx: bf.IContext<string>) {
                    expect(ctx.state).toBe('default');
                    b.asap(done);
                }
            })(valueCursor);

            init(factory(aRouteParams('routeParam')));
        })

        it('has route data', (done: () => void) => {
            let factory = c.createRouteComponent<IState, c.IRouteData>({
                render(ctx: ICtx) {
                    expect(ctx.data).toEqual({ routeParams: { routeParam: 'routeParam' } });
                    b.asap(done);
                }
            })(valueCursor);

            init(factory(aRouteParams('routeParam')));
        })
    })

    describe('init', () => {
        it('sets state into context', (done: () => void) => {
            let factory = c.createRouteComponent<string, c.IRouteData>({
                render(ctx: bf.IContext<string>) {
                    expect(ctx.state).toBe('default');
                    b.asap(done);
                }
            })(valueCursor);

            init(factory(aRouteParams('routeParam')));
        })
    })

    describe('render', () => {
        it('is invoked on state change', () => {
            let cursor = { key: 'value' };
            let renderStates: string[] = [];
            let factory = c.createRouteComponent<string, c.IRouteData>({
                render(ctx: bf.IContext<string>) {
                    renderStates = [...renderStates, ctx.state];
                }
            })(valueCursor);

            init(factory(aRouteParams()));
            expect(renderStates).toEqual(['default']);
            bf.createParamLessAction(cursor, () => { return 'newValue' })();
            b.syncUpdate();
            expect(renderStates).toEqual(['default', 'newValue']);
        })
    })

    function aRouteParams(paramValue: string = 'aRouteParam'): bf.IRouteData {
        return { routeParams: { routeParam: paramValue } };
    }

    function init(children: b.IBobrilChildren) {
        b.init(() => children);
        b.syncUpdate();
    }
})

interface ICtx extends bf.IContext<IState> {
}

interface IState extends bf.IState {
    value: string
}
