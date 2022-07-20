import React from 'react';

const Navbar = ({children}) => {

    return(
        <>
            <header className="bg-indigo-600">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                    <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                        <div className="flex items-center">
                            <a href="/" className='flex flex-row items-center'>
                                <span className="sr-only">Trellie</span>
                                <img
                                    className="h-10 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                                    alt=""
                                />
                                <span className="font-medium text-gray-50 ml-4 text-2xl">Trellie</span>
                            </a>
                        </div>
                        <div className="ml-10 space-x-4">
                            <a
                            href="/login"
                            className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                            >
                            Sign in
                            </a>
                            <a
                            href="/register"
                            className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                            >
                            Sign up
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            {children}
        </>
    );
}

export default Navbar;