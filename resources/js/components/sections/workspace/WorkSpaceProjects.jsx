import React, { useEffect, useState } from "react";
import { CalendarIcon, UsersIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { useWorkSpace } from "../../../hooks";
import { EmptyProject } from "../projects";

const WorkSpaceProjects = ({id}) => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const { getWorkSpaceProjects } = useWorkSpace();
    useEffect(() => {
        getWorkSpaceProjects(id).then(res => {
            if(res) setProjects(res.data);
        });
    },[])
    return(
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-4">
                <div className="card py-4">
                    {projects.length > 0 ? 
                    (
                        <div>
                            <div className="m-4">
                                <button 
                                onClick={() => navigate(`/new-project/${id}`)}
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                New Project
                                </button>
                            </div>
                            <ul role="list" className="divide-y divide-gray-200">
                                {projects.map((item) => (
                                    <li key={item.id}>
                                        <Link to={`/project/${item.id}/team`} className="block hover:bg-gray-50">
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-indigo-600 truncate">{item.name}</p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {item.task_count} tasks left to do 
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:flex sm:justify-between">
                                                    <div className="sm:flex">
                                                        <p className="flex items-center text-sm text-gray-500 mr-2">
                                                            {item.description}
                                                        </p>
                                                        <p className="mt-2 sm:mt-0 flex items-center text-sm text-gray-500">
                                                            <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            {JSON.parse(item.peoples).length} Peoples
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
                    ) : (
                        <div className="flex justify-center items-center border-4 border-dashed border-gray-200 rounded-lg h-96">
                            <EmptyProject workspaceId={id} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default WorkSpaceProjects;