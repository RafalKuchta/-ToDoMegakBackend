import {TodoEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface NewTodoEntity extends Omit<TodoEntity, 'id'> {
    id?: string;

}

export class TodoRecord implements TodoEntity {
    public id: string;
    public name: string;
    public completed: boolean;

    constructor(obj: NewTodoEntity) {
        if (!obj.name || obj.name.length > 1000) {
            throw new ValidationError('Nazwa zadanie nie może być pusta, ani przekraczać 1000 znaków.');
        }

        this.name = obj.name;
        this.completed = obj.completed;

    }

}