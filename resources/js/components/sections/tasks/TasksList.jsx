import React, { useState, useEffect } from 'react';
import { BadgeCheckIcon, CalendarIcon, LightningBoltIcon} from '@heroicons/react/solid';
import { useAuth, useTask } from '../../../hooks';
import { UserIcon } from '@heroicons/react/outline';
import { Modal } from '../../ui';

const TasksList = () => {

    const auth = useAuth();
    const [modaldata, setModaldata] = useState({show: false, name: '', description: '', instruction: ''})
    const [tasks, setTasks] = useState([]);

    const { getAllTasksByType } = useTask();

    useEffect(() => {
        getTasks();
    },[]);

    const getTasks = (type = 0) => {
        getAllTasksByType(type).then((res) => {
            setTasks(res.data)
        }).catch((err) => {
            auth.setNotify({show: true, type: 'error', message: err.message});
        });
    };

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="m-4">
                <button 
                onClick={() => getTasks(0)}
                type="button"
                className="inline-flex items-center mr-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                <LightningBoltIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Ongoing
                </button>
                <button 
                onClick={() => getTasks(1)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                <BadgeCheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Completed
                </button>
            </div>
            <ul role="list" className="divide-y divide-gray-200">
                {tasks.map((item) => (
                    <li key={item.id}>
                        <div onClick={() => setModaldata({show: true, name: item.name, desc: item.description, instruction: item.instruction})} className="group block hover:bg-gray-50">
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
                                        <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <p>
                                            Mentor - {item.user.name}
                                        </p>
                                        <CalendarIcon className="flex-shrink-0 mr-1.5 ml-4 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <p>
                                            Created at <time dateTime={item.created_at}>{new Date(item.created_at).toLocaleDateString("en-US",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</time>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <span className="group-hover:visible absolute text-gray-500 rounded-md shadow-md bg-gray-50 text-xs font-bold transition-all duration-100 p-2 text-center min-w-max invisible">
                                Click Me
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
            <Modal data={modaldata}>
                    <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                        <div className="ml-4 mt-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{modaldata.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {modaldata.desc}
                            </p>
                        </div>
                    </div>
                    <div className="mt-3 sm:mt-5">
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                            {modaldata.instruction}
                            </p>
                        </div>
                    </div>
            </Modal>
        </div>
    )
}

export default TasksList;