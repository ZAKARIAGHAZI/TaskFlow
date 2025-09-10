import React, { useState } from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Pencil, Trash2 } from "lucide-react";

// Task Form Modal
function TaskFormModal({
    show,
    onClose,
    onSubmit,
    users,
    data,
    setData,
    errors,
    isEditing,
}) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative p-6 animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                    {isEditing ? "Edit Task" : "Create New Task"}
                </h2>

                <form onSubmit={onSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Assign */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Assign To
                        </label>
                        <select
                            value={data.assigned_to}
                            onChange={(e) =>
                                setData("assigned_to", e.target.value)
                            }
                            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.assigned_to && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.assigned_to}
                            </p>
                        )}
                    </div>

                    {/* Status (only in editing mode) */}
                    {isEditing && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isEditing ? "Update Task" : "Create Task"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Task Table
function TaskTable({ tasks, onEdit, onStatusChange }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case "done":
                return (
                    <Badge className="bg-green-100 text-green-700">
                        {status}
                    </Badge>
                );
            case "in_progress":
                return (
                    <Badge className="bg-yellow-100 text-yellow-700">
                        {status}
                    </Badge>
                );
            default:
                return (
                    <Badge className="bg-gray-100 text-gray-700">
                        {status}
                    </Badge>
                );
        }
    };

    return (
        <Card>
            <CardContent className="overflow-x-auto p-0">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-sm">
                            <th className="px-5 py-3">Title</th>
                            <th className="px-5 py-3">Description</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3">Assigned To</th>
                            <th className="px-5 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr
                                    key={task.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-5 py-3 font-medium">
                                        {task.title}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">
                                        {task.description || "-"}
                                    </td>
                                    <td
                                        className="px-5 py-3 cursor-pointer"
                                        onClick={() => onStatusChange(task)}
                                    >
                                        {getStatusBadge(task.status)}
                                    </td>
                                    <td className="px-5 py-3">
                                        {task.assigned_user?.name ||
                                            "Unassigned"}
                                    </td>
                                    <td className="px-5 py-3 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => onEdit(task)}
                                        >
                                            <Pencil className="w-4 h-4 mr-1" />{" "}
                                            Edit
                                        </Button>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "tasks.destroy",
                                                task.id
                                            )}
                                            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />{" "}
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="px-5 py-6 text-center text-gray-500"
                                >
                                    No tasks found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}

// Dashboard
export default function TaskDashboard({ auth }) {
    const { tasks, users, flash } = usePage().props;

    const { data, setData, post, put, reset, errors } = useForm({
        id: null,
        title: "",
        description: "",
        status: "todo",
        assigned_to: "",
    });

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const startCreate = () => {
        reset();
        setData("status", "todo");
        setShowForm(true);
        setIsEditing(false);
    };

    const startEdit = (task) => {
        setData({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            assigned_to: task.assigned_to || "",
        });
        setShowForm(true);
        setIsEditing(true);
    };

    const cycleStatus = (status) =>
        status === "todo"
            ? "in_progress"
            : status === "in_progress"
            ? "done"
            : "todo";

    const updateStatus = (task) => {
        put(route("tasks.update", task.id), {
            _method: "PUT",
            status: cycleStatus(task.status),
            preserveScroll: true,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route("tasks.update", data.id), {
                onSuccess: () => setShowForm(false),
            });
        } else {
            post(route("tasks.store"), {
                onSuccess: () => setShowForm(false),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800">
                    Task Dashboard
                </h2>
            }
        >
            <div className="p-6 space-y-6">
                {/* Flash message */}
                {flash?.success && (
                    <div className="p-3 rounded-lg bg-green-100 text-green-700 shadow-sm">
                        {flash.success}
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Tasks</h1>
                    <Button
                        onClick={startCreate}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4 mr-2" /> New Task
                    </Button>
                </div>

                {/* Modal Form */}
                <TaskFormModal
                    show={showForm}
                    onClose={() => setShowForm(false)}
                    onSubmit={submit}
                    users={users}
                    data={data}
                    setData={setData}
                    errors={errors}
                    isEditing={isEditing}
                />

                {/* Task Table */}
                <TaskTable
                    tasks={tasks}
                    onEdit={startEdit}
                    onStatusChange={updateStatus}
                />
            </div>
        </AuthenticatedLayout>
    );
}
