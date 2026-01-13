import { Injectable } from '@nestjs/common';
import { TodoRepositoryImpl } from './todo.repository.impl/todo.repository.impl';
import { TodoStatus } from './todo.enums';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepositoryImpl) {}

  create(data) {
    return this.repo.create(data);
  }

  findAll(status?: TodoStatus) {
    return this.repo.findAll(status);
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, data) {
    return this.repo.update(id, data);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
