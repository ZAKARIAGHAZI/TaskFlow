import { Link, Head } from "@inertiajs/react";
import React from "react";

// Assuming you'll have a Dashboard component for the user's main task view.
export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to TaskFlow" />
            <div className="relative flex items-center justify-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900">
                <div className="fixed top-0 right-0 p-6 text-right">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route("register")}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
                <div className="max-w-4xl mx-auto p-6 lg:p-8 text-center">
                    <div className="flex justify-center mb-8">
                        {/* A more modern, simplified icon for a task manager */}
                        <svg
                            className="w-20 h-20 text-indigo-600 dark:text-indigo-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M9 2a1 1 0 00-1 1v1h2V3a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v1h2V3a1 1 0 00-1-1zM4 6a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6zm2 2v2a1 1 0 001 1h10a1 1 0 001-1V8H6z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        TaskFlow
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                        Manage your tasks effortlessly. Stay organized, boost
                        productivity, and get things done.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <a
                            href={route("register")}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
