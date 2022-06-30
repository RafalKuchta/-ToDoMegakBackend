import {TodoRecord} from "../records/todo-record";
import { pool } from "../utils/db";

const defaultObject = {
    name: 'Test 2',
    completed: true,
};

afterAll(async () => {
    await pool.end();
});


test('TodoRecord.getOne returns data from database for one entry', async () => {
    const todo = await TodoRecord.getOne('abc');

    console.log(todo)

    expect(todo).toBeDefined();
    expect(todo.id).toBe('abc');
    expect(todo.name).toBe('Zrobić zakupy');
});

test('TodoRecord.getOne returns null from database for unexisting entry.', async () => {
    const todo = await TodoRecord.getOne('abcxxxxx');
    expect(todo).toBeNull();
});

test('TodoRecord.findAll returns array of found entry.', async () => {
    const todo = await TodoRecord.findAll('');
    expect(todo).not.toEqual([]);
    expect(todo[0].id).toBeDefined();
});

test('TodoRecord.findAll returns array of found entry when searching for "a".', async () => {
    const todo = await TodoRecord.findAll('z');
    expect(todo).not.toEqual([]);
    expect(todo[0].id).toBeDefined();
});

test('TodoRecord.findAll returns empty array when searching something not exist', async () => {
    const todo = await TodoRecord.findAll('-----------------------------------');
    expect(todo).toEqual([]);
});

test('TodoRecord.insert - returns UUID', async () => {
    const todo = new TodoRecord(defaultObject);
    await todo.insert();
    expect(todo.id).toBeDefined();
    expect(typeof todo.id).toBe('string');
});

test('TodoRecord.insert - inserts data to database.', async () => {
    const todo = new TodoRecord(defaultObject);
    await todo.insert();
    const foundTodo = await TodoRecord.getOne(todo.id);

    expect(foundTodo).toBeDefined();
    expect(foundTodo).not.toBeNull();
    expect(foundTodo.id).toBe(todo.id);
});