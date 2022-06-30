import {Router} from "express";
import {TodoRecord} from "../records/todo-record";
import { ValidationError } from "../utils/errors";

export const todoRouter = Router();

todoRouter
    .get('/',  (req, res) => {
        res.json({
            ok: 'Backend działa',
        });
    })
    .get('/search/:name?', async (req, res) => {
        const todos = await TodoRecord.findAll(req.params.name ?? "");
        res.json(todos);
    })
    .get('/:id', async (req, res) => {
        const todo = await TodoRecord.getOne(req.params.id);
        res.json(todo);
    })
    .post('/', async (req, res) => {
        const todo = new TodoRecord(req.body);
        await todo.insert();
        res.json(todo);
    })
    .patch('/:id', async (req, res) => {
        const todo = await TodoRecord.getOne(req.params.id);

        if (!todo) {
            throw new ValidationError('No such this task.');
        }
        await todo.done();
    })
    .patch('/edit/:id', async (req, res) => {
        const todo = await TodoRecord.getOne(req.params.id);
        const name = req.body.name;

        if (!todo) {
            throw new ValidationError('No such this task.');
        }
        await todo.editName(name);
    })
    .patch('/back/:id', async (req, res) => {
        const todo = await TodoRecord.getOne(req.params.id);

        if (!todo) {
            throw new ValidationError('No such this task.');
        }
        await todo.back();
    })
    .delete('/:id', async (req, res) => {
        const todo = await TodoRecord.getOne(req.params.id);

        if (!todo) {
            throw new ValidationError('No such this task.');
        }
        await todo.delete();
    })