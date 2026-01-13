import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../todo.entity';
import { TodoRepository } from '../todo.repository';
import { TodoStatus } from '../todo.enums';

@Injectable()
export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly repo: Repository<TodoEntity>,
  ) {}

  create(todo: Partial<TodoEntity>) {
    const entity = this.repo.create(todo);
    return this.repo.save(entity);
  }

  findAll(status?: TodoStatus) {
    if (status) return this.repo.find({ where: { status } });
    return this.repo.find();
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<TodoEntity>) {
    await this.repo.update(id, data);
    const todo = await this.findById(id);

    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async delete(id: string) {
    await this.repo.delete(id);
  }
}
