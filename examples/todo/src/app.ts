import * as b from 'node_modules/bobril/index';
import bootstrap from './bootstrap';

bootstrap();

b.init(() => {
    return ['Hello Bobflux Todo example!'];
});
