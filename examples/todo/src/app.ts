import * as b from 'bobril';
import * as mp from './mainPage';
import * as tdp from './todosPage';

b.routes(
    b.route(
        {
            url: '/',
            handler: mp.create
        },
        [
            b.routeDefault({
                name: 'default',
                handler: tdp.create
            }),

        ])
);