import * as b from 'node_modules/bobril/index';
import bootstrap from './bootstrap';
import * as todoItemsList from './todoItemsList';
import * as todoItemsHeader from './todoItemsHeader';
import * as cursors from './cursors';
import * as guiFactory from './guiFactory';

bootstrap();

b.init(() => {
    return [
        'Hello Bobflux Todo example!',
        todoItemsHeader.create(cursors.editedTodo, {}),
        todoItemsList.create(cursors.todos, {})
    ];
});
