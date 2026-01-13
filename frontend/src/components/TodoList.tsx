"use client";

import { useEffect, useRef, useState } from "react";
import { getTodos } from "@/services/api";
import { Todo, TodoStatus } from "@/types/todo";
import TodoItem from "./TodoItem";
import { Filter, Loader } from "lucide-react";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<TodoStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    done: 0,
  });

  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const data = await getTodos(status || undefined);
        setTodos(data);
        calculateStats(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [status]);

  const calculateStats = (data: Todo[]) => {
    setStats({
      total: data.length,
      pending: data.filter((t) => t.status === "PENDING").length,
      inProgress: data.filter((t) => t.status === "IN PROGRESS").length,
      done: data.filter((t) => t.status === "DONE").length,
    });
  };

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await getTodos(status || undefined);
      setTodos(data);
      calculateStats(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-gray-100 to-gray-100 rounded-2xl p-6 text-black shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Task Manager</h1>
            <p className="text-gray-900 mt-1">Stay organized and productive</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-xl backdrop-blur-sm">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Tasks</span>
            <span className="px-2 py-1 bg-white/60 rounded-lg text-sm font-bold">
              {stats.total}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-yellow-500/20 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </div>
          <div className="bg-blue-500/20 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm font-medium">In Progress</span>
            </div>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </div>
          <div className="bg-green-500/20 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium">Done</span>
            </div>
            <div className="text-2xl font-bold">{stats.done}</div>
          </div>
          <div className="bg-purple-500/20 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-sm font-medium">Completion</span>
            </div>
            <div className="text-2xl font-bold">
              {stats.total > 0
                ? Math.round((stats.done / stats.total) * 100)
                : 0}
              %
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Task List</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={loadTodos}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Loader className="w-4 h-4" />
              Refresh
            </button>
            <select
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-800"
              value={status}
              onChange={(e) => setStatus(e.target.value as TodoStatus | "")}
            >
              <option value="">All Tasks</option>
              <option value="PENDING">Pending</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading tasks...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
              <svg
                className="w-full h-full"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No tasks found
            </h3>
            <p className="text-gray-500">
              {status
                ? `No ${status.toLowerCase()} tasks`
                : "Create your first task to get started"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {todos.map((t) => (
              <TodoItem key={t.id} todo={t} refresh={loadTodos} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
