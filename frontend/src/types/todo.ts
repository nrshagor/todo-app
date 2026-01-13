export type TodoStatus = "PENDING" | "IN PROGRESS" | "DONE";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}
