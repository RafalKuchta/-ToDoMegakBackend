import {TodoRecord} from "../records/todo-record";

test('Can build TodoRecord', () => {
    const todo = new TodoRecord({
        name: 'Test name todo',
        completed: false,
    });

    expect(todo.name).toBe('Test name todo');
    expect(todo.completed).toBe(false);
})