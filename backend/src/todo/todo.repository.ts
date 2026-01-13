import { TodoEntity } from './todo.entity';
import { TodoStatus } from './todo.enums';

export interface TodoRepository {
  create(todo: Partial<TodoEntity>): Promise<TodoEntity>;
  findAll(status?: TodoStatus): Promise<TodoEntity[]>;
  findById(id: string): Promise<TodoEntity | null>;
  update(id: string, data: Partial<TodoEntity>): Promise<TodoEntity>;
  delete(id: string): Promise<void>;
}
