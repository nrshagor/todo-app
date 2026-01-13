"use client";

import { useState, FormEvent } from "react";
import { createTodo } from "@/services/api";

interface Props {
  onAdd: () => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createTodo({ title, description });

    setTitle("");
    setDescription("");
    onAdd();
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 py-2">Add Todo</button>
    </form>
  );
}
