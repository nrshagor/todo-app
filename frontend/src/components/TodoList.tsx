"use client";

import { useEffect, useRef, useState } from "react";
import { getTodos } from "@/services/api";
import { Todo, TodoStatus } from "@/types/todo";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<TodoStatus | "">("");

  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const load = async () => {
      const data = await getTodos(status || undefined);
      setTodos(data);
    };

    load();
  }, [status]);

  return (
    <>
      <select
        className="border p-2 mb-4"
        value={status}
        onChange={(e) => setStatus(e.target.value as TodoStatus | "")}
      >
        <option value="">ALL</option>
        <option value="PENDING">PENDING</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <div className="space-y-2">
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            refresh={() => {
              getTodos(status || undefined).then(setTodos);
            }}
          />
        ))}
      </div>
    </>
  );
}
