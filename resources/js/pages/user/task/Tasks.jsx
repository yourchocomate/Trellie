import React from "react";
import { TasksList } from "../../../components/sections/tasks";
import { Sidebar } from "../../../components/ui";

const Task = () => {

    return (
        <Sidebar>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                    <TasksList/>
                </div>
            </div>
        </Sidebar>
    );
}

export default Task;