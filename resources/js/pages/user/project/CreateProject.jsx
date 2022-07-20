import React from "react";
import { useParams } from "react-router-dom";
import { CreateForm } from "../../../components/sections/projects";
import { Sidebar } from "../../../components/ui";

const CreateProject = () => {
    const { workspaceId } = useParams();
    return (
        <Sidebar>
            <CreateForm workspaceId={workspaceId}/>
        </Sidebar>
    );
}

export default CreateProject;