import * as b from 'node_modules/bobril/index';

export function createCheckbox(value: boolean, onChange: (value: boolean) => void): b.IBobrilNode {
    return {
        tag: 'input',
        attrs: {
            type: 'checkbox',
            value: value
        },
        component: {
            onChange: (ctx: any, v: boolean) => onChange(v)
        }
    };
}

export function createButton(label: string, onClick: () => boolean): b.IBobrilNode {
    return {
        tag: 'button',
        children: label,
        component: {
            onClick(): boolean {
                return onClick();
            }
        }
    };
}

export function createInput(value: string, onValueChange: (v: string) => void): b.IBobrilNode {
    return {
        tag: "input",
        style: {
            width: "100%",
            boxSizing: "border-box"
        },
        attrs: {
            value: value
        },
        component: {
            onChange(ctx: any, v: string) {
                onValueChange(v);
            }
        }
    };
}