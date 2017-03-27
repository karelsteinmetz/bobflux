import * as b from "bobril";
import * as bf from "../index";
import * as c from "../src/component";

describe("component", () => {

    beforeEach(() => {
        bf.bootstrap({ value: "default" }, {});
        jasmine.clock().install();
    })

    afterEach(() => {
        jasmine.clock().uninstall();
    })

    describe("context", () => {
        describe("single cursor", () => {
            it("has current state", (done: Function) => {
                const factory = c.createComponent<IState>({
                    render(ctx: ICtx) {
                        expect(ctx.state).toBe("default");
                        done();
                    }
                });

                init(factory({ key: "value" })());
            })

            it("has used cursor", (done: Function) => {
                const cursor = { key: "value" };
                const factory = c.createComponent<IState>({
                    render(ctx: ICtx) {
                        expect(ctx.cursor).toBe(cursor);
                        done();
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

            it("has current states for each cursor", (done: Function) => {
                const factory = c.createComponent<IState>({
                    render(ctx: ICursorsMapCtx) {
                        expect(ctx.state).toBeUndefined();
                        expect(ctx.firstCursor).toBe(cursors["first"]);
                        expect(ctx.firstState).toBe("default");
                        done();
                    }
                });

                init(factory(cursors)());
            })
        })
    })

    describe("init", () => {
        it("sets state to context", (done: Function) => {
            let factory = c.createComponent<IState>({
                render(ctx: ICtx) {
                    expect(ctx.state).toBe("default");
                    done();
                }
            });

            init(factory({ key: "value" })());
        })
    })

    describe("render", () => {
        it("is invoked on state change", (done: Function) => {
            let cursor = { key: "value" };
            let renderStates: IState[] = [];
            let factory = c.createComponent<IState>({
                render(ctx: ICtx) {
                    renderStates = [...renderStates, ctx.state];
                }
            })(cursor);

            new Promise((f) => {
                init(factory());
                f();
            }).then(() => {
                expect(renderStates).toEqual(["default"]);
                invalidate();
            }).then(() => {
                expect(renderStates).toEqual(["default"]);
                bf.createParamLessAction(cursor, () => { return "newValue" })();
                tick();
            }).then(() => {
                expect(renderStates).toEqual(["default", "newValue"]);
                done();
            }).catch((e) => {
                console.log("Unexpected error", e);
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