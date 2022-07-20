import axios from "axios";
import { logErr } from "../catch.error";

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
        return logErr(err);
    }
    return response;
}

export { useTaskCreate, useTaskUpdate, useTaskDelete };