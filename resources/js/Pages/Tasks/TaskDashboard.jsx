import React, { useState } from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth }) {
    const { tasks, users, flash } = usePage().props;

    // Task counts
    const counts = {
        todo: tasks.filter((t) => t.status === "todo").length,
        in_progress: tasks.filter((t) => t.status === "in_progress").length,
        done: tasks.filter((t) => t.status === "done").length,
    };

    // Form for creating / editing
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

    const updateStatus = (task, newStatus) => {
        put(route("tasks.update", task.id), {
            _method: "PUT",
            status: newStatus,
            preserveScroll: true,
            onSuccess: () => {},
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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Task Dashboard
                </h2>
            }
        >
            
            <div className="p-6 space-y-6">
                {/* Flash message */}
                {flash?.success && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
                        {flash.success}
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Task Dashboard</h1>
                    <button
                        onClick={startCreate}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        New Task
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-white rounded-lg text-center">
                        <p className="text-xl font-bold">{counts.todo}</p>
                        <p className="text-gray-600">To Do</p>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-lg text-center">
                        <p className="text-xl font-bold">
                            {counts.in_progress}
                        </p>
                        <p className="text-gray-600">In Progress</p>
                    </div>
                    <div className="p-4 bg-green-100 rounded-lg text-center">
                        <p className="text-xl font-bold">{counts.done}</p>
                        <p className="text-gray-600">Done</p>
                    </div>
                </div>

                {/* Modal Form */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            >
                                ✕
                            </button>
                            <h2 className="text-lg font-bold mb-4">
                                {isEditing ? "Edit Task" : "New Task"}
                            </h2>

                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className="w-full mt-1 p-2 border rounded-lg"
                                        required
                                    />
                                    {errors.title && (
                                        <div className="text-red-600 text-sm">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">
                                        Description
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="w-full mt-1 p-2 border rounded-lg"
                                    />
                                    {errors.description && (
                                        <div className="text-red-600 text-sm">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">
                                        Assign To
                                    </label>
                                    <select
                                        value={data.assigned_to}
                                        onChange={(e) =>
                                            setData(
                                                "assigned_to",
                                                e.target.value
                                            )
                                        }
                                        className="w-full mt-1 p-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select user</option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.assigned_to && (
                                        <div className="text-red-600 text-sm mt-1">
                                            {errors.assigned_to}
                                        </div>
                                    )}
                                </div>

                                {isEditing && (
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full mt-1 p-2 border rounded-lg"
                                        >
                                            <option value="todo">To Do</option>
                                            <option value="in_progress">
                                                In Progress
                                            </option>
                                            <option value="done">Done</option>
                                        </select>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        {isEditing ? "Update" : "Create"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Task Table */}
                <div className="overflow-x-auto bg-white shadow rounded-lg mt-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Assigned To</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <tr key={task.id} className="border-t">
                                        <td className="px-4 py-2">
                                            {task.title}
                                        </td>
                                        <td className="px-4 py-2">
                                            {task.description || "-"}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded text-xs cursor-pointer ${
                                                    task.status === "done"
                                                        ? "bg-green-100 text-green-700"
                                                        : task.status ===
                                                          "in_progress"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                                onClick={() => {
                                                    // Cycle through statuses: todo → in_progress → done
                                                    const nextStatus =
                                                        task.status === "todo"
                                                            ? "in_progress"
                                                            : task.status ===
                                                              "in_progress"
                                                            ? "done"
                                                            : "todo";
                                                    updateStatus(
                                                        task,
                                                        nextStatus
                                                    );
                                                }}
                                            >
                                                {task.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-2">
                                            {task.assigned_user?.name ||
                                                "Unassigned"}
                                        </td>
                                        <td className="px-4 py-2 space-x-2">
                                            <button
                                                onClick={() => startEdit(task)}
                                                className="text-yellow-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={route(
                                                    "tasks.destroy",
                                                    task.id
                                                )}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-4 py-4 text-center text-gray-500"
                                    >
                                        No tasks found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
