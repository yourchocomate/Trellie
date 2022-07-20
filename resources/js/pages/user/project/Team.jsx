import React from "react";
import { useParams } from "react-router-dom";
import { ManageTeam } from "../../../components/sections/projects";
import { Sidebar } from "../../../components/ui";

const Team = () => {
    const { projectId} = useParams();
    return (
        <Sidebar>
            <ManageTeam projectId={projectId}/>
        </Sidebar>
    );
}

export default Team;