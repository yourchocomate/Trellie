import axios from 'axios';
import { logErr } from '../catch.error';

const useAuthVerify = async(token) => {

    let response = [];

    try{
        response = await axios.get(`/api/auth/verify`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    } catch (err) {
        if(err.response.status === 422) return err.response;
        return logErr(err);
    }

    return response;
}

const useAuthLogin = async(data) => {
    
    let response = [];

    try{
        response = await axios.post(`/api/auth/login`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (err) {
        if(err.response.status === 422) return err.response;
        return logErr(err);
    }

    return response;
}

const useAuthRegister = async(data) => {
    
    let response = [];

    try{
        response = await axios.post(`/api/auth/register`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (err) {
        if(err.response.status === 422) return err.response;
        return logErr(err);
    }

    return response;
}

const useAuthLogout = () => {
    try {
        axios.post(`/api/auth/logout`);
    } catch (err) {
        if(err.response.status === 422) return err.response;
        return logErr(err);
    }

    return true;
}

export {useAuthLogin, useAuthVerify, useAuthRegister, useAuthLogout};