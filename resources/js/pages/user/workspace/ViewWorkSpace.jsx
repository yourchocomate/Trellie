import React from "react";
import { useParams } from "react-router-dom";
import { WorkSpaceProjects } from "../../../components/sections/workspace";
import { Sidebar } from "../../../components/ui";

const ViewWorkSpace = () => {
    const { id } = useParams();
    return(
        <Sidebar>
            <WorkSpaceProjects id={id}/>
        </Sidebar>
    );
}

export default ViewWorkSpace;