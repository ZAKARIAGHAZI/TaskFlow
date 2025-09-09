// src/Pages/TaskDashboard.jsx
import React, { useState } from "react";

const TaskDashboard = () => {
    // Static tasks
    const [tasks, setTasks] = useState([
        { id: 1, title: "Finish React project", status: "In Progress" },
        { id: 2, title: "Update Laravel API", status: "Pending" },
        { id: 3, title: "Fix CSS bugs", status: "Completed" },
    ]);

    // Add new task (static, updates local state)
    const [newTask, setNewTask] = useState("");

    const handleAddTask = () => {
        if (newTask.trim() === "") return;
        const newId = tasks.length + 1;
        setTasks([...tasks, { id: newId, title: newTask, status: "Pending" }]);
        setNewTask("");
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>

            {/* Add Task */}
            <div className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task"
                    className="border p-2 flex-1 rounded"
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add
                </button>
            </div>

            {/* Task List */}
            <div className="space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="p-4 border rounded flex justify-between items-center"
                    >
                        <span className="font-medium">{task.title}</span>
                        <span
                            className={`px-2 py-1 rounded text-white ${
                                task.status === "Completed"
                                    ? "bg-green-500"
                                    : task.status === "In Progress"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                            }`}
                        >
                            {task.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskDashboard;
