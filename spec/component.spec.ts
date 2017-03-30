import * as b from "bobril";
import * as bf from "../index";
import * as c from "../src/component";

describe("component", () => {

    beforeEach(() => {
        bf.bootstrap({ value: "default" }, {});
    })

    afterEach(() => {
        init(undefined);
    })

    describe("context", () => {
        describe("single cursor", () => {
            it("has current state", (done: () => void) => {
                const factory = c.createComponent<IState>({
                    render(ctx: ICtx) {
                        expect(ctx.state).toBe("default");
                        b.asap(done);
                    }
                });

                init(factory({ key: "value" })());
            })

            it("has used cursor", (done: () => void) => {
                const cursor = { key: "value" };
                const factory = c.createComponent<IState>({
                    render(ctx: ICtx) {
                        expect(ctx.cursor).toBe(cursor);
                        b.asap(done);
                    }
                });

                init(factory(cursor)());
            })
        })
        describe("cursors map", () => {
            const cursors = { ["first"]: { key: "value" } };

            interface ICursorsMapCtx extends ICtx {
                firstCursor: bf.ICursor<IState>;
                firstState: IState;
            }

            it("has current states for each cursor", (done: () => void) => {
                const factory = c.createComponent<IState>({
                    render(ctx: ICursorsMapCtx) {
                        expect(ctx.state).toBeUndefined();
                        expect(ctx.firstCursor).toBe(cursors["first"]);
                        expect(ctx.firstState).toBe("default");
                        b.asap(done);
                    }
                });

                init(factory(cursors)());
            })
        })
    })

    describe("init", () => {
        it("sets state to context", (done: () => void) => {
            let factory = c.createComponent<IState>({
                render(ctx: ICtx) {
                    expect(ctx.state).toBe("default");
                    b.asap(done);
                }
            });

            init(factory({ key: "value" })());
        })
    })

    describe("render", () => {
        it("is invoked on state change", () => {
            let cursor = { key: "value" };
            let renderStates: IState[] = [];
            let factory = c.createComponent<IState>({
                render(ctx: ICtx) {
                    renderStates = [...renderStates, ctx.state];
                }
            })(cursor);

            init(factory());
            expect(renderStates).toEqual(["default"]);
            invalidate();
            expect(renderStates).toEqual(["default"]);
            bf.createParamLessAction(cursor, () => { return "newValue" })();
            b.syncUpdate();
            expect(renderStates).toEqual(["default", "newValue"]);
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
