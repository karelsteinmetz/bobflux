import * as b from 'bobril';
import * as f from './src/flux';
import * as mp from './src/mainPage';
import * as tdp from './src/todosPage';
import * as c from './src/cursors';
import * as s from './src/states';

b.asset('css/bootstrap.css');

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