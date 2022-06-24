import {NewTodoEntity, TodoEntity} from "../types";
import { pool } from "../utils/db";
import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type TodoRecordResult = [TodoEntity[], FieldPacket[]];

export class TodoRecord implements TodoEntity {
    public id: string;
    public name: string;
    public completed: boolean;

    constructor(obj: NewTodoEntity) {
        if (!obj.name || obj.name.length > 1000) {
            throw new ValidationError('Nazwa zadanie nie może być pusta, ani przekraczać 1000 znaków.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.completed = obj.completed;

    }

    static async getOne(id: string): Promise<TodoRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `todo` WHERE id = :id", {
            id,
        }) as TodoRecordResult;

        return results.length === 0 ? null : new TodoRecord(results[0]);
    }

    static async findAll(name: string): Promise<TodoRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `todo` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as TodoRecordResult;

        return results.map(result => new TodoRecord(result));
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert id, because it is already exist.');
        };

        if (!this.completed) {
            this.completed = false;
        }

        await pool.execute("INSERT INTO `todo` (`id`, `name`, `completed`) VALUES(:id, :name, :completed)", this);
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `todo` WHERE `id` = :id", {
            id: this.id,
        });
    }

    async done(): Promise<void> {
        await pool.execute("UPDATE `todo` SET `completed` = :completed WHERE `id` = :id", {
            id: this.id,
            completed: true,
        });
    }

    async back(): Promise<void> {
        await pool.execute("UPDATE `todo` SET `completed` = :completed WHERE `id` = :id", {
            id: this.id,
            completed: false,
        });
    }
}
