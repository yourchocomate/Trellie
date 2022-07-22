import React from "react";
import { useParams } from "react-router-dom";
import { CreateForm } from "../../../components/sections/tasks";
import { Sidebar } from "../../../components/ui";

const CreateTask =() => {

    const { projectId } = useParams();

    return (
        <Sidebar>
            <CreateForm projectId={projectId} />
        </Sidebar>
    );
}

export default CreateTask;