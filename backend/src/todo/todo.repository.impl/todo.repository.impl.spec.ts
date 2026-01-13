import { Test, TestingModule } from '@nestjs/testing';
import { TodoRepositoryImpl } from './todo.repository.impl';

describe('TodoRepositoryImpl', () => {
  let provider: TodoRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoRepositoryImpl],
    }).compile();

    provider = module.get<TodoRepositoryImpl>(TodoRepositoryImpl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
