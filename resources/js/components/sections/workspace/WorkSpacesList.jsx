import React from 'react';
import { CalendarIcon, PlusIcon } from '@heroicons/react/solid';
import { Link, useNavigate } from 'react-router-dom';

const WorkSpacesList = ({workspaces}) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="m-4">
                <button 
                onClick={() => navigate("/new-workspace")}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Workspace
                </button>
            </div>
            <ul role="list" className="divide-y divide-gray-200">
                {workspaces.map((item) => (
                    <li key={item.id}>
                        <Link to={`/workspace/${item.id}`} className="block hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-indigo-600 truncate">{item.name}</p>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <p>
                                            Created at <time dateTime={item.created_at}>{new Date(item.created_at).toLocaleDateString("en-US",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</time>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WorkSpacesList;