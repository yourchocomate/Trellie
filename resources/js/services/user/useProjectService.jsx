import axios from "axios";
import { logErr } from "../catch.error";

const useProjectGet = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/project/all`, data,
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

const useProjectCreate = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/project/create`, data,
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

const useProjectUpdate = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/project/update`, data,
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

const useProjectDelete = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/project/delete`, data,
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

const useProjectAddTeam = async (data) => {
    let response = [];
    try {
        response = await axios.post(`/api/project/team`, data,
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

const useProjectTeamSuggestion = async (projectId) => {
    let response = [];
    try {
        response = await axios.get(`/api/project/team-suggestion/${projectId}`,
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

export { useProjectCreate, useProjectUpdate, useProjectDelete, useProjectGet, useProjectAddTeam, useProjectTeamSuggestion };