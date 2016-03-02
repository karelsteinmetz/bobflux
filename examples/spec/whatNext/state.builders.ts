import * as s from '../../src/whatNext/state';
import * as f from '../../src/flux';

export class WhatNextStateBuilder {
    private state: s.IWhatNextState = s.default();

    public withSources(sources: s.IBobrilSource[]): WhatNextStateBuilder {
        this.state.sources = sources;
        return this;
    };

    public build(): s.IWhatNextState {
        f.bootstrap(this.state);
        return this.state;
    }
}

export class BobrilSourceBuilder {
    // default state must be set manualy
    private state: s.IBobrilSource = { name: null, description: null, link: null };

    public withName(name: string): BobrilSourceBuilder {
        this.state.name = name;
        return this;
    };

    public withDescription(description: string): BobrilSourceBuilder {
        this.state.description = description;
        return this;
    };

    public withLink(link: string): BobrilSourceBuilder {
        this.state.link = link;
        return this;
    };

    public build(): s.IBobrilSource {
        return this.state;
    }
}
