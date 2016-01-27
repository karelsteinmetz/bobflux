import * as b from 'bobril';
import * as f from './src/flux';
import * as mp from './src/mainPage';
import * as tdp from './src/todos/todosPage';
import * as s from './src/states';
import * as c from './src/states.cursors';
import * as wnp from './src/whatNext/page';

b.asset('css/bootstrap.css');

f.bootstrap(s.default(), (message, params) => { });

b.routes(
    b.route(
        {
            url: '/',
            handler: mp.create
        },
        [
            b.route({
                url: '/todos',
                name: 'todos',
                handler: tdp.create(c.todosCursor)
            }),
            b.route({
                url: '/whatNext',
                name: 'whatNext',
                handler: wnp.create(c.whatNextCursor)
            }),
            b.routeDefault({
                name: 'default',
                handler: tdp.create(c.todosCursor)
            })
        ])
);