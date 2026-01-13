const API_URL = "http://localhost:3000";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2ODMyMzcyMywiZXhwIjoxNzY4OTI4NTIzfQ.yl4s5RBAu4OHZMmk9g60qMkBdm4EOdyO8GDWlYNcYlQ";

export async function getTodos(status?: string) {
  const url = status ? `/todos?status=${status}` : "/todos";

  const res = await fetch(API_URL + url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function createTodo(data: any) {
  const res = await fetch(API_URL + "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateTodo(id: string, data: any) {
  const res = await fetch(API_URL + `/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteTodo(id: string) {
  return fetch(API_URL + `/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
