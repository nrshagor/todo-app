import 'dotenv/config';
import { DataSource } from 'typeorm';
import { TodoEntity } from '../todo/todo.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [TodoEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
