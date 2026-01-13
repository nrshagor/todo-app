"use client";

import { Todo } from "@/types/todo";
import { updateTodo, deleteTodo } from "@/services/api";

interface Props {
  todo: Todo;
  refresh: () => void;
}

export default function TodoItem({ todo, refresh }: Props) {
  const confirmAction = (msg: string) => window.confirm(msg);

  return (
    <div className="border p-3 flex justify-between">
      <div>
        <h3 className="font-bold">{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
        <small>Status: {todo.status}</small>
      </div>

      <div className="space-x-2">
        {todo.status === "PENDING" && (
          <button
            className="bg-yellow-500 text-white px-2 cursor-pointer"
            onClick={async () => {
              if (!confirmAction("Move to IN PROGRESS?")) return;
              await updateTodo(todo.id, {
                status: "IN PROGRESS",
              });
              refresh();
            }}
          >
            In Progress
          </button>
        )}

        {todo.status !== "DONE" && (
          <button
            className="bg-green-500 text-white px-2 cursor-pointer"
            onClick={async () => {
              if (!confirmAction("Mark as DONE?")) return;
              await updateTodo(todo.id, { status: "DONE" });
              refresh(); // 🔥 UI update
            }}
          >
            DONE
          </button>
        )}

        <button
          className="bg-red-500 text-white px-2 cursor-pointer"
          onClick={async () => {
            if (!confirmAction("Delete this todo?")) return;
            await deleteTodo(todo.id);
            refresh(); // 🔥 UI update
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
