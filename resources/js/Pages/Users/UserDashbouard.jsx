import React, { useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from "@inertiajs/react";

export default function UserDashboard({ auth, users = [], flash }) {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [editingUser, setEditingUser] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            Inertia.put(`/users/${editingUser.id}`, form);
        } else {
            Inertia.post("/users", form);
        }
        setForm({ name: "", email: "", password: "" });
        setEditingUser(null);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setForm({ name: user.name, email: user.email, password: "" });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            Inertia.delete(`/users/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Management</h2>}
        >
            <Head title="User Dashboard" />
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

            {/* Flash Message */}
            {flash && (
                <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                    {flash}
                </div>
            )}

            {/* User Form */}
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <h2 className="text-lg font-semibold mb-2">
                    {editingUser ? "Edit User" : "Create New User"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder={
                                editingUser
                                    ? "New Password (optional)"
                                    : "Password"
                            }
                            value={form.password}
                            onChange={handleChange}
                            required={!editingUser}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {editingUser ? "Update" : "Create"} User
                        </button>
                        {editingUser && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingUser(null);
                                    setForm({
                                        name: "",
                                        email: "",
                                        password: "",
                                    });
                                }}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* User Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="px-4 py-4 text-center text-gray-500"
                                >
                                    No users found.
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
