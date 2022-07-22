import axios from "axios";
import { logErr } from "../catch.error";


const useTaskGet = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/task/all`, data,
        {
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (err) {
        return logErr(err);
    }
    return response;
}


const useTaskCreate = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/task/create`, data,
        {
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (err) {
        if(err.response.status === 422) return err.response;
        return logErr(err);
    }
    return response;
}

const useTaskUpdate = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/task/update`, data,
        {
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (err) {
        if(err.response.status === 422) return err.response;
        return logErr(err);
    }
    return response;
}

const useTaskDelete = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/task/delete`, data,
        {
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (err) {
        if(err.response.status === 422) return err.response;
        return logErr(err);
    }
    return response;
}

export { useTaskGet,useTaskCreate, useTaskUpdate, useTaskDelete };