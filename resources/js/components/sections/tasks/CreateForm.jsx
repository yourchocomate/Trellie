import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useStateForm, useTask} from "../../../hooks";

const initialState = {
    name: '',
    description: '',
    project_id: '',
};

const CreateForm = ({projectId}) => {
    const navigate = useNavigate();
    const auth = useAuth();
    const { formState, onChange, resetForm } = useStateForm({...initialState, project_id: projectId});
    const { createTask } = useTask(formState, (res) => {
        resetForm();
        auth.setNotify({ show: true, type: 'success', message: res.message });
    }, (err) => {
        auth.setNotify({ show: true, type: 'error', message: err });
    })

    return(
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-4">
                <div className="card py-4">
                    <form className="space-y-8 divide-y divide-gray-200" onSubmit={createTask}>
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                            <div>
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Create Task</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Assign new task for a project.
                                    </p>
                                </div>

                                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Title
                                            <p className="mt-1 text-xs text-gray-500">
                                                Task Title which will catch the eye
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
                                            Description
                                            <p className="mt-1 text-xs text-gray-500">
                                                A short description of the task
                                            </p>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <textarea
                                            id="description"
                                            name="description"
                                            onChange={onChange}
                                            value={formState.description}
                                            rows={2}
                                            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                            />
                                            <p className="mt-2 text-sm text-gray-500">Write a few short intro for the task.</p>
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="instruction" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Instruction 
                                            <p className="mt-1 text-xs text-gray-500">
                                                Full Instruction of the task requirements
                                            </p>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <textarea
                                            id="instruction"
                                            name="instruction"
                                            onChange={onChange}
                                            value={formState.instruction}
                                            rows={8}
                                            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                            />
                                            <p className="mt-2 text-sm text-gray-500">Write full instruction for the task.</p>
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