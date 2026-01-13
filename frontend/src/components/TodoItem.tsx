"use client";
import { Todo } from "@/types/todo";
import { updateTodo, deleteTodo } from "@/services/api";
import { CheckCircle, Clock, PlayCircle, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import TodoModal from "./TodoModal";

interface Props {
  todo: Todo;
  refresh: () => void;
}

export default function TodoItem({ todo, refresh }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  // Use "IN PROGRESS" with space to match backend
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "IN PROGRESS": "bg-blue-100 text-blue-800 border-blue-200",
    DONE: "bg-green-100 text-green-800 border-green-200",
  };

  const statusIcons = {
    PENDING: <Clock className="w-4 h-4" />,
    "IN PROGRESS": <PlayCircle className="w-4 h-4" />,
    DONE: <CheckCircle className="w-4 h-4" />,
  };

  const handleAction = async (action: () => Promise<void>, type: string) => {
    setLoading(type);
    try {
      await action();
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 border border-gray-100 hover:border-gray-200 group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${
                  statusColors[todo.status as keyof typeof statusColors]
                }`}
              >
                {statusIcons[todo.status as keyof typeof statusIcons]}
                {todo.status}
              </div>
              <span className="text-xs text-gray-500">
                ID: {todo.id.slice(0, 8)}...
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 ${
                    todo.status === "PENDING"
                      ? "bg-yellow-400"
                      : todo.status === "IN PROGRESS"
                      ? "bg-blue-400"
                      : "bg-green-400"
                  }`}
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {todo.description}
                  </p>
                )}

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Details
                  </button>

                  {todo.status !== "DONE" && (
                    <button
                      onClick={() =>
                        handleAction(async () => {
                          if (window.confirm("Mark as DONE?")) {
                            await updateTodo(todo.id, { status: "DONE" });
                            refresh();
                          }
                        }, "done")
                      }
                      disabled={loading === "done"}
                      className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1 text-sm font-medium disabled:opacity-50"
                    >
                      {loading === "done" ? (
                        <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      Mark Done
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleAction(async () => {
                        if (window.confirm("Delete this task?")) {
                          await deleteTodo(todo.id);
                          refresh();
                        }
                      }, "delete")
                    }
                    disabled={loading === "delete"}
                    className="text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1 text-sm font-medium disabled:opacity-50"
                  >
                    {loading === "delete" ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {todo.status === "PENDING" && (
              <button
                onClick={() =>
                  handleAction(async () => {
                    if (window.confirm("Start working on this?")) {
                      await updateTodo(todo.id, { status: "IN PROGRESS" });
                      refresh();
                    }
                  }, "progress")
                }
                disabled={loading === "progress"}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                {loading === "progress" ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <PlayCircle className="w-4 h-4" />
                )}
                Start
              </button>
            )}

            {todo.status === "IN PROGRESS" && (
              <button
                onClick={() =>
                  handleAction(async () => {
                    if (window.confirm("Mark as completed?")) {
                      await updateTodo(todo.id, { status: "DONE" });
                      refresh();
                    }
                  }, "done")
                }
                disabled={loading === "done"}
                className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                {loading === "done" ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                Complete
              </button>
            )}
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        todo={todo}
        onUpdate={refresh}
      />
    </>
  );
}
