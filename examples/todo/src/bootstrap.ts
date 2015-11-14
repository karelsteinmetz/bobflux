import * as f from './flux';
import * as states from './states';

export default () => {
    f.bootstrap(states.default(), (m, p) => console.log('todo -> ' + m, p));
}
