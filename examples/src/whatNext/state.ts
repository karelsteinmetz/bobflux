import * as f from '../flux';


export interface IWhatNextState extends f.IRouteComponentState {
    sources: IBobrilSource[]
}

export interface IBobrilSource extends f.IComponentState {
    name: string
    description: string
    link: string
}

export const createDefaultWhatNextState = (): IWhatNextState => {
    return {
        sources: [
            {
                name: 'Bobril',
                description: 'Component oriented framework inspired by ReactJs (Virtual DOM, components with state) and Mithril (size, more complete framework). Easy automatic generation of code and its speed has higher priority over simplicity. Basically Bobril has most interesting features from ReactJs plus is faster, more complete, smaller, more polyfills for IE9. Isomorphic JavaScript is not implemented because it would increase size and is not needed for SEO anyway (Google bot supports JavaScript). Because it is already used in Production code, further development must not broke any functionality. Any new feature must be optional or its perceived value to minified size ratio must be high enough.',
                link: 'https://github.com/Bobris/Bobril/blob/master/README.md'
            },
            {
                name: 'Bobril-Build',
                description: 'Helper tool to build Bobril applications Mainly it will support copying sprites, building big sprites. support i18n. All this during optimal TypeScript compilation.',
                link: 'https://github.com/Bobris/bobril-build'
            },
            {
                name: 'Bobflux',
                description: 'Bobflux is pure functional implementation of FLUX architecture',
                link: 'https://github.com/karelsteinmetz/bobflux'
            },
            {
                name: 'Fun-Model',
                description: 'Fun-Model is core of Bobflux. It isn\'t dependent on Bobril.',
                link: 'https://github.com/karelsteinmetz/fun-model/'
            },
            {
                name: 'Bobflux-Gen',
                description: 'NodeJs generator for monkey files in bobflux application. Inspired by bobril-build',
                link: 'https://github.com/karelsteinmetz/bobflux-gen'
            },
            {
                name: 'Bobflux-Monitor',
                description: 'Component for time travelling in bobflux application state history.',
                link: 'https://github.com/keeema/bobflux-monitor/'
            },
            {
                name: 'Bobril-CSS-Bootstrap',
                description: 'Bobril components for CSS-Bootstrap',
                link: 'https://github.com/karelsteinmetz/bobril-css-bootstrap'
            }
        ]
    }
}

export const createDefaultBobrilSource = (): IBobrilSource => {
    return {
        name: null,
        description: null,
        link: null
    };
}
