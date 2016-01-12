import * as b from 'bobril';
import * as f from 'bobflux';
import * as mp from './mainPage';
import * as tdp from './todosPage';
import * as c from './cursors';
import * as s from './states';

f.bootstrap(s.default(), (message, params) => { });

b.routes(
    b.route(
        {
            url: '/',
            handler: mp.create
        },
        [
            b.routeDefault({
                name: 'default',
                handler: tdp.create(c.todosSection)
            }),

        ])
);