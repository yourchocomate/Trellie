import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useProject, useStateForm} from "../../../hooks";

const initialState = {
    name: '',
    description: '',
    workspace_id: '',
};

const CreateForm = ({workspaceId}) => {
    const navigate = useNavigate();
    const auth = useAuth();
    const { formState, onChange, resetForm } = useStateForm({...initialState, workspace_id: workspaceId});
    const { createProject } = useProject(formState, (res) => {
        resetForm();
        auth.setNotify({ show: true, type: 'success', message: res.message });
    }, (err) => {
        auth.setNotify({ show: true, type: 'error', message: err });
    })

    return(
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-4">
                <div className="card py-4">
                    <form className="space-y-8 divide-y divide-gray-200" onSubmit={createProject}>
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                            <div>
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Create Project</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        New project will be created in your account.
                                    </p>
                                </div>

                                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Name
                                            <p className="mt-1 text-xs text-gray-500">
                                                The name of your project.
                                            </p>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                onChange={onChange}
                                                value={formState.name}
                                                autoComplete="name"
                                                className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Short Description
                                            <p className="mt-1 text-xs text-gray-500">
                                                A short description of your project.
                                            </p>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <textarea
                                            id="description"
                                            name="description"
                                            onChange={onChange}
                                            value={formState.description}
                                            rows={3}
                                            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                            />
                                            <p className="mt-2 text-sm text-gray-500">Write a few sentences about the project.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                            <button
                                onClick={() => navigate(-1)}
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateForm;