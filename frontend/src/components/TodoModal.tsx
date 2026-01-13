"use client";

import { Todo } from "@/types/todo";
import { updateTodo } from "@/services/api";
import {
  X,
  Clock,
  PlayCircle,
  CheckCircle,
  Calendar,
  Hash,
} from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
  onUpdate: () => void;
}

export default function TodoModal({ isOpen, onClose, todo, onUpdate }: Props) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const statusOptions = [
    {
      value: "PENDING",
      label: "Pending",
      icon: Clock,
      color: "text-yellow-600 bg-yellow-50",
    },
    {
      value: "IN PROGRESS",
      label: "In Progress",
      icon: PlayCircle,
      color: "text-blue-600 bg-blue-50",
    },
    {
      value: "DONE",
      label: "Done",
      icon: CheckCircle,
      color: "text-green-600 bg-green-50",
    },
  ];

  const handleStatusChange = async (newStatus: Todo["status"]) => {
    if (newStatus === todo.status) return;

    setLoading(true);
    try {
      await updateTodo(todo.id, { status: newStatus });
      onUpdate();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                todo.status === "PENDING"
                  ? "bg-yellow-50 text-yellow-600"
                  : todo.status === "IN PROGRESS"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {todo.status === "PENDING" && <Clock className="w-6 h-6" />}
              {todo.status === "IN PROGRESS" && (
                <PlayCircle className="w-6 h-6" />
              )}
              {todo.status === "DONE" && <CheckCircle className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Task Details</h2>
              <p className="text-sm text-gray-500">View and manage task</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Hash className="w-4 h-4" />
              <span>Task ID: {todo.id}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{todo.title}</h3>
            {todo.description && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Description
                </h4>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">
                  {todo.description}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Status</h4>
              <div className="flex flex-col gap-2">
                {statusOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() =>
                        handleStatusChange(option.value as Todo["status"])
                      }
                      disabled={loading || todo.status === option.value}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                        todo.status === option.value
                          ? `${option.color} border-current`
                          : "border-gray-200 hover:border-current hover:bg-gray-50"
                      } disabled:opacity-50`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{option.label}</span>
                      {todo.status === option.value && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Created At
                </h4>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(todo.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Updated At
                </h4>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(todo.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  {todo.status === "PENDING" && (
                    <button
                      onClick={() => handleStatusChange("IN PROGRESS")}
                      disabled={loading}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow transition-all duration-200 disabled:opacity-50"
                    >
                      Start Working
                    </button>
                  )}
                  {todo.status !== "DONE" && (
                    <button
                      onClick={() => handleStatusChange("DONE")}
                      disabled={loading}
                      className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:shadow transition-all duration-200 disabled:opacity-50"
                    >
                      Mark as Done
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
