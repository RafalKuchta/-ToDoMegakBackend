import {TodoRecord} from "../records/todo-record";

test('TodoRecord returns data from database for one entry', async () => {
    const todo = await TodoRecord.getOne('abc');

    console.log(todo)

    expect(todo).toBeDefined();
    expect(todo.id).toBe('abc');
    expect(todo.name).toBe('Zrobić zakupy');
});

test('TodoRecord returns null from database for unexisting entry.', async () => {
    const todo = await TodoRecord.getOne('abcxxxxx');
    expect(todo).toBeNull();
})