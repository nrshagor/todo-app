import { Todo, TodoStatus } from "@/types/todo";

const API_URL = "http://localhost:3000";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2ODMyMzcyMywiZXhwIjoxNzY4OTI4NTIzfQ.yl4s5RBAu4OHZMmk9g60qMkBdm4EOdyO8GDWlYNcYlQ";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export async function getTodos(status?: TodoStatus): Promise<Todo[]> {
  const url = status ? `/todos?status=${status}` : "/todos";

  const res = await fetch(API_URL + url, { headers });

  return res.json();
}

export async function createTodo(
  data: Pick<Todo, "title" | "description">
): Promise<Todo> {
  const res = await fetch(API_URL + "/todos", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateTodo(
  id: string,
  data: Partial<Pick<Todo, "title" | "status">>
): Promise<Todo> {
  const res = await fetch(API_URL + `/todos/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteTodo(id: string): Promise<void> {
  await fetch(API_URL + `/todos/${id}`, {
    method: "DELETE",
    headers,
  });
}
