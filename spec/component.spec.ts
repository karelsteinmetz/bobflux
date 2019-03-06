import * as b from "bobril";
import * as bf from "../index";
import * as c from "../src/component";

describe("component", () => {
    let valueCursor: bf.ICursor<string> = { key: 'value' };

    beforeEach(() => {
        bf.bootstrap({ value: "default" }, {});
    })

    afterEach(() => {
        init(undefined);
    })

    describe("context", () => {
        describe("single cursor", () => {
            it("has current state", (done: () => void) => {
                const factory = c.createComponent<string>({
                    render(ctx: bf.IContext<string>) {
                        expect(ctx.state).toBe("default");
                        b.asap(done);
                    }
                });

                init(factory(valueCursor)());
            })

            it("has used cursor", (done: () => void) => {
                const factory = c.createComponent<string>({
                    render(ctx: bf.IContext<string>) {
                        expect(ctx.cursor).toBe(valueCursor);
                        b.asap(done);
                    }
                });

                init(factory(valueCursor)());
            })
        })
        describe("cursors map", () => {
            const cursors = { ["first"]: valueCursor };

            interface ICursorsMapCtx extends ICtx {
                firstCursor: bf.ICursor<string>;
                firstState: string;
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
            let factory = c.createComponent<string>({
                render(ctx: bf.IContext<string>) {
                    expect(ctx.state).toBe("default");
                    b.asap(done);
                }
            });

            init(factory(valueCursor)());
        })
    })

    describe("render", () => {
        it("is invoked on state change", () => {
            let renderStates: string[] = [];
            let factory = c.createComponent<string>({
                render(ctx: bf.IContext<string>) {
                    renderStates = [...renderStates, ctx.state];
                }
            })(valueCursor);

            init(factory());
            expect(renderStates).toEqual(["default"]);
            invalidate();
            expect(renderStates).toEqual(["default"]);
            bf.createParamLessAction(valueCursor, () => { return "newValue" })();
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
