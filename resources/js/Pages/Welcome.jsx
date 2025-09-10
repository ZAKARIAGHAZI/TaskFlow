import { Link, Head } from "@inertiajs/react";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// A reusable Header component
const Header = ({ auth }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed w-full z-10 top-0 left-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo or App Name */}
                    <div className="flex-shrink-0 flex items-center text-2xl font-bold">

                        Task
                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            Flow
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md font-medium transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <XMarkIcon
                                    className="block h-6 w-6"
                                    aria-hidden="true"
                                />
                            ) : (
                                <Bars3Icon
                                    className="block h-6 w-6"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="block w-full text-center px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

// The main welcome page component
export default function Welcome({ auth }) {
    return (
        <>
            <Head title="TaskFlow" />
            <Header auth={auth} />
            <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="bg-dots-darker dark:bg-dots-lighter absolute inset-0 opacity-10"></div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                        Organize your life,{" "}
                        <span className="text-indigo-600 dark:text-indigo-400">
                            one task at a time.
                        </span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        TaskFlow helps you manage your projects, to-dos, and
                        daily routines effortlessly. Stay productive and get
                        things done with our intuitive and powerful task
                        management platform.
                    </p>
                    <div className="mt-8 sm:mt-10 flex justify-center">
                        {!auth.user && (
                            <Link
                                href={route("register")}
                                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 border border-transparent text-base sm:text-lg font-bold rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Get Started Now
                            </Link>
                        )}
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
