export interface NewTodoEntity extends Omit<TodoEntity, 'id'> {
    id?: string;
}

export interface TodoEntity {
    id: string;
    name: string;
    completed: boolean;
}
