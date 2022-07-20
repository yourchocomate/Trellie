import React, { useEffect, useState } from 'react';
import { EmptyWorkspace, WorkSpacesList } from '../../components/sections/workspace';
import { Sidebar } from '../../components/ui';
import { useAuth, useWorkSpace } from '../../hooks';

const Dashboard = () => {
    const [workspaces, setWorkspaces] = useState([]);

    const auth = useAuth();

    const { getWorkSpaces } = useWorkSpace();
    useEffect(() => {
        getWorkSpaces().then(res => {
            if(res) setWorkspaces(res.data);
        });
    },[]);

    return (
        <>
            <Sidebar>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900">👋 Hi,  {`{${auth.user.name}}`}</h1>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="py-4">
                        {workspaces.length > 0 ? (
                            <WorkSpacesList workspaces={workspaces} />
                        ) : (
                            <div className="flex justify-center items-center border-4 border-dashed border-gray-200 rounded-lg h-96">
                                <EmptyWorkspace />
                            </div>
                        )}
                    </div>
                </div>
            </Sidebar>
        </>
    );
}

export default Dashboard;