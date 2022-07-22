import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthRoutes, ProtectedRoutes } from './components';
import { Notify } from './components/ui';
import { HomePage, NotFound } from './pages';
import { Login, Register } from './pages/auth';
import { CreateProject, CreateTask, CreateWorkSpace, Dashboard, Projects, Tasks, Team, ViewWorkSpace } from './pages/user';


const App = () => {
    return (
        <Router>
            <>
                <Notify/>
                <Routes>
                    {/* Homepage */}
                    <Route path='/' element={<HomePage />} />

                    {/* Auth Routes with middleware*/}
                    <Route path='/' element={<AuthRoutes />} >
                        <Route path='login' element={<Login/>}/>
                        <Route path='register' element={<Register />} />
                    </Route>

                    {/* Protected Routes */}
                    <Route path='/' element={<ProtectedRoutes/>}>

                        {/* Dashboard / Workspace  */}
                        <Route path='dashboard' element={<Dashboard/>}/>
                        <Route path='new-workspace' element={<CreateWorkSpace/>}/>
                        <Route path='workspace/:id' element={<ViewWorkSpace/>}/>

                        {/* Projects Routes */}
                        <Route path='projects' element={<Projects/>}/>
                        <Route path='new-project/:workspaceId' element={<CreateProject/>}/>
                        <Route path='project/:projectId/team' element={<Team/>}/>

                        {/* Task Routes */}
                        
                        <Route path='tasks' element={<Tasks/>}/>
                        <Route path='new-task/:projectId' element={<CreateTask/>}/>
                    </Route>

                    {/* Trigger if matches no upper routes */}
                    <Route path='*' element={<NotFound/>} />
                </Routes>
            </>
        </Router>
    );
}

export default App;