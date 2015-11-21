import * as bobflux from '../node_modules/bobflux/dist/index';
import * as states from './states';

export default () => {
    bobflux.bootstrap(states.default(), (m, p) => console.log('todo -> ' + m, p));
}
