"use client";

import { useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Todo App</h1>

      <TodoForm onAdd={() => setRefresh((p) => p + 1)} />

      <TodoList key={refresh} />
    </main>
  );
}
