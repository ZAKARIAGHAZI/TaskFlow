import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import {
    PlusIcon,
    ClipboardDocumentCheckIcon,
    ClockIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatCard = ({ title, value, icon, bgColor, textColor }) => (
    <div
        className={`p-4 sm:p-6 rounded-2xl shadow-md ${bgColor} transition-transform transform hover:scale-105`}
    >
        <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm font-medium uppercase tracking-wide text-gray-700 dark:text-gray-300">
                {title}
            </div>
            <div className={`p-2 rounded-full ${textColor}`}>{icon}</div>
        </div>
        <div className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {value}
        </div>
    </div>
);

export default function Dashboard({ auth, tasks }) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "done").length;
    const pendingTasks = tasks.filter((t) => t.status === "in_progress").length;
    const todoTasks = tasks.filter((t) => t.status === "todo").length;

    const pieChartData = {
        labels: ["To Do", "In Progress", "Done"],
        datasets: [
            {
                label: "# of Tasks",
                data: [todoTasks, pendingTasks, completedTasks],
                backgroundColor: [
                    "rgba(248, 113, 113, 0.8)",
                    "rgba(251, 191, 36, 0.8)",
                    "rgba(74, 222, 128, 0.8)",
                ],
                borderColor: [
                    "rgba(248, 113, 113, 1)",
                    "rgba(251, 191, 36, 1)",
                    "rgba(74, 222, 128, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: auth.user.theme === "dark" ? "#D1D5DB" : "#4B5563",
                },
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || "";
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce(
                            (sum, current) => sum + current,
                            0
                        );
                        const percentage = total ? ((value / total) * 100).toFixed(2) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                    <h2 className="font-semibold text-lg sm:text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                        Dashboard
                    </h2>
                    <Link
                        href={route("tasks.index")}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        New Task
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="py-6 sm:py-10">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
                    {/* Welcome Section */}
                    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                            Hello, {auth.user.name}! 👋
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                            Here's a quick overview of your tasks.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        <StatCard
                            title="Total Tasks"
                            value={totalTasks}
                            icon={
                                <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-500" />
                            }
                            bgColor="bg-blue-50 dark:bg-blue-950"
                            textColor="text-blue-500"
                        />
                        <StatCard
                            title="Completed"
                            value={completedTasks}
                            icon={
                                <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500" />
                            }
                            bgColor="bg-green-50 dark:bg-green-950"
                            textColor="text-green-500"
                        />
                        <StatCard
                            title="In Progress"
                            value={pendingTasks}
                            icon={
                                <ClockIcon className="h-6 w-6 text-yellow-500" />
                            }
                            bgColor="bg-yellow-50 dark:bg-yellow-950"
                            textColor="text-yellow-500"
                        />
                        <StatCard
                            title="To Do"
                            value={todoTasks}
                            icon={
                                <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                            }
                            bgColor="bg-red-50 dark:bg-red-950"
                            textColor="text-red-500"
                        />
                    </div>

                    {/* Chart Section */}
                    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Task Breakdown
                        </h3>
                        <div className="flex justify-center">
                            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md" style={{ height: 300 }}>
                                <Pie
                                    data={pieChartData}
                                    options={pieChartOptions}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
