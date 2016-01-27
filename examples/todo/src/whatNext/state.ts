import * as f from '../flux';


export interface IWhatNextState extends f.IState {
   sources: IBobrilSource[]
}

export interface IBobrilSource {
    name: string
    description: string
    link: string
}

export default (): IWhatNextState => {
    return {
        sources: [{
            name: 'Bobril',
            description: 'Component oriented framework inspired by ReactJs (Virtual DOM, components with state) and Mithril (size, more complete framework). Easy automatic generation of code and its speed has higher priority over simplicity. Basically Bobril has most interesting features from ReactJs plus is faster, more complete, smaller, more polyfills for IE9. Isomorphic JavaScript is not implemented because it would increase size and is not needed for SEO anyway (Google bot supports JavaScript). Because it is already used in Production code, further development must not broke any functionality. Any new feature must be optional or its perceived value to minified size ratio must be high enough.',
            link: 'https://github.com/Bobris/Bobril/blob/master/README.md'
        }]
    }
}