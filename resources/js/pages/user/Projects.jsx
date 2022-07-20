import React from 'react';
import { ProjectTable } from '../../components/sections/projects';
import { Sidebar } from '../../components/ui';

const Projects = () => {
    return (
        <>
            <Sidebar>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="py-4">
                        <ProjectTable />
                    </div>
                </div>
            </Sidebar>
        </>
    );
}

export default Projects;