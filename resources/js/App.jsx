import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthRoutes, ProtectedRoutes } from './components';
import { Notify } from './components/ui';
import { HomePage, NotFound } from './pages';
import { Login, Register } from './pages/auth';
import { CreateProject, CreateWorkSpace, Dashboard, Projects, Team, ViewWorkSpace } from './pages/user';


const App = () => {
    return (
        <Router>
            <>
                <Notify/>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/' element={<AuthRoutes />} >
                        <Route path='login' element={<Login/>}/>
                        <Route path='register' element={<Register />} />
                    </Route>
                    <Route path='/' element={<ProtectedRoutes/>}>
                        <Route path='dashboard' element={<Dashboard/>}/>
                        <Route path='projects' element={<Projects/>}/>
                        <Route path='new-project/:workspaceId' element={<CreateProject/>}/>
                        <Route path='project/:projectId/team' element={<Team/>}/>
                        <Route path='new-workspace' element={<CreateWorkSpace/>}/>
                        <Route path='workspace/:id' element={<ViewWorkSpace/>}/>
                    </Route>
                    <Route path='*' element={<NotFound/>} />
                </Routes>
            </>
        </Router>
    );
}

export default App;