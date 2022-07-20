import React, { useState } from "react";
import { SearchIcon, UserIcon } from "@heroicons/react/outline";
import { useAuth, useProject, useStateForm } from "../../../hooks";
import { useEffect } from "react";

const initialFormState = {
    from_date: '',
    to_date: '',
    search: '',
}

const projectsInitialState = {
    data: [], 
    meta: {
        current_page: 1,
        last_page: 1,
        per_page: 5,
        total: 0,
        to: 0,
    }
}

const PaginationTable = () => {

    const auth = useAuth();
    const [projects, setProjects] = useState(projectsInitialState);

    const {formState, onChange} = useStateForm(initialFormState);

    const { getProjectsWithFilter } = useProject(formState, (res) => {
        setProjects(res)
    }, (err) => {
        auth.setNotify({show: true, type: 'error', message: err})
    });

    useEffect(() => {
        getProjectsWithFilter()
    },[])

    return (
        <div className="flex flex-col">
            <div className="bg-white px-4 py-3 flex items-center flex-col lg:flex-row w-full justify-between border-t border-gray-200 sm:px-6 mt-4 mb-2">
                <div className="w-full lg:w-auto">
                    <p className="text-gray-500 font-medium mb-2 sm:hidden">Filter By Date:</p>
                    <form onSubmit={getProjectsWithFilter}>
                        <div className="flex items-center justify-between flex-col sm:flex-row w-full">
                            <div className="relative w-full sm:w-auto">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                </div>
                                <input name="from_date" onChange={onChange} value={formState.from_date} type="date" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300" placeholder="Select date start" />
                            </div>
                            <span className="hidden sm:block mx-4 text-gray-500">to</span>
                            <div className="flex mt-2 sm:mt-0 w-full sm:w-auto">
                                <div className="relative w-full sm:w-auto">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <input name="to_date" onChange={onChange} value={formState.to_date} type="date" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300" placeholder="Select date end" />
                                </div>
                                <button
                                    type="submit"
                                    className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="w-full lg:w-auto">
                    <p className="text-gray-500 font-medium mb-2 mt-2 sm:hidden">Filter By Name or Email:</p>
                    <form onSubmit={getProjectsWithFilter}>
                        <div className="lg:mt-0 mt-2 flex rounded-md shadow-sm">
                            <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                <input
                                type="text"
                                name="search"
                                onChange={onChange}
                                value={formState.search}
                                id="search"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                                placeholder="John Doe"
                                />
                            </div>
                            <button
                                type="submit"
                                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                {projects.data.map((project) => (
                                <tr key={project.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className=" font-medium text-indigo-600 truncate">{project.name}</div>
                                                <div className="text-sm text-gray-500">Created By: {project.user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{project.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex flex-row"> 
                                            <div className="ml-5 flex flex-row text-gray-400">
                                                <UserIcon className="h-5 w-5" aria-hidden="true" />
                                                <span>{JSON.parse(project.peoples).length}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-2"
                aria-label="Pagination"
            >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{projects.meta.current_page}</span> to <span className="font-medium">{projects.meta.to}</span> of{' '}
                        <span className="font-medium">{projects.meta.total}</span> results
                    </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                    <button
                        type="button"
                        onClick={() => getProjectsWithFilter(false, projects.meta.current_page - 1)}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => getProjectsWithFilter(false, projects.meta.current_page + 1)}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default PaginationTable;