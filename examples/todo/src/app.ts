import * as b from '../node_modules/bobril/index';
import bootstrap from './bootstrap';
import todoItemsList from './todoItemsList';
import todoItemsHeader from './todoItemsHeader';
import footer from './footer';
import * as cursors from './cursors';
import container from './bootstrap/container';

bootstrap();

b.init(() => {
    return container({
        content: [
            'Hello I\'m Bobflux Todo example!',
            todoItemsHeader(cursors.editedTodo, {}),
            todoItemsList(cursors.todos, {}),
            footer(cursors.todos, {})
        ]
    })
});
