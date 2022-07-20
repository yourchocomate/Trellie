import axios from "axios";
import { logErr } from "../catch.error";

const useWorkSpaceGetAll = async () => {
    let response = [];
    try {
        response = await axios.get(`/api/workspace`,
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

const useWorkSpaceGetProjects = async (id) => {
    let response = [];
    try {
        response = await axios.get(`/api/workspace/${id}`,
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

const useWorkSpaceCreate = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/workspace/create`, data,
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

const useWorkSpaceUpdate = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/workspace/update`, data,
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

const useWorkSpaceDelete = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/workspace/delete`, data,
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

export { useWorkSpaceCreate, useWorkSpaceUpdate, useWorkSpaceDelete, useWorkSpaceGetAll, useWorkSpaceGetProjects };