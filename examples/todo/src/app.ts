import * as b from 'node_modules/bobril/index';
import bootstrap from './bootstrap';
import * as todoItemsList from './todoItemsList';
import * as todoItemsHeader from './todoItemsHeader';
import * as cursor from './cursors';
import * as guiFactory from './guiFactory';

bootstrap();

b.init(() => {
    return [
        'Hello Bobflux Todo example!',
        todoItemsHeader.create(cursor.editedTodo, {}),
        todoItemsList.create(cursor.todos, {})
    ];
});
