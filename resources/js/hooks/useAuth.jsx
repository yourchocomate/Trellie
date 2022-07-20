import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuthLogin, useAuthRegister, useAuthVerify, useAuthLogout } from '../services/auth'

const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

export const useProvideAuth = () => {
    const [user, setUser] = useState(false);

    const [notify, setNotify] = useState({show: false,type: '', message: ''});

    const login = async(data, handleSuccess, handleFailure) => {
        const res = await useAuthLogin(data);
        if(res && res.data) {

            if(res.data.user) {

                setUser(res.data.user);
                localStorage.setItem('token', res.data.token);
                return handleSuccess(res.data.message);

            } else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    };
    const register = async(data, handleSuccess, handleFailure) => {
        const res = await useAuthRegister(data);
        if(res && res.data) {

            if(res.data.user) {

                setUser(res.data.user);
                localStorage.setItem('token', res.data.token);
                return handleSuccess(res.data.message);

            } else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    };

    const logout = async() => {
        const logout = useAuthLogout();
        if(logout) {
            localStorage.clear();
            return setUser(false);
        }
    };
    
    useEffect(() => {

        let isActive = true;
        if(!user && isActive) verify();

        return () => isActive = false;

    }, []);

    const verify = async() => {
        if(!user)
        {
            const token = localStorage.getItem('token');
            if(token) useAuthVerify(token).then(user => {
                            if (user && user.data && user.data.user) setUser(user.data.user);
                            else setUser(false);
                        });
        }
    }

    return { user, login, register, logout, notify, setNotify };
}