import * as bobflux from 'node_modules/bobflux/dist/src/index';
import * as states from './states';

export default () => {
    bobflux.bootstrap(states.default());
}
