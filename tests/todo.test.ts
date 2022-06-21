import {TodoRecord} from "../records/todo-record";
import { pool } from "../utils/db";

afterAll(async () => {
    await pool.end();
})

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