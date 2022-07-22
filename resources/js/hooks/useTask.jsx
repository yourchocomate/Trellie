import { 
    useTaskCreate, 
    useTaskDelete, 
    useTaskGet, 
    useTaskUpdate, 
} from "../services/user";

export const useTask = (formData, handleSuccess, handleFailure) => {

    const getAllTasksByType = async(type = 0) => {
        const res = await useTaskGet({type});
        if(res && res.data && res.data.data) return res.data;
        else return false;
    }

    const createTask = async(e) => {
        e.preventDefault();
        const res = await useTaskCreate(formData);
        if(res && res.data) {

            if(res.data.data) return handleSuccess(res.data.data);

            else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    }

    const updateTask = async(e) => {
        e.preventDefault();
        const res = await useTaskUpdate(formData);
        if(res && res.data) {

            if(res.data.data) return handleSuccess(res.data.data);

            else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    }

    const deleteTask = async(e) => {
        e.preventDefault();
        const res = await useTaskDelete(formData);
        if(res && res.data) {

            if(res.data.message) return handleSuccess(res.data.message);

            else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    }

    return {
        createTask,
        updateTask,
        deleteTask,
        getAllTasksByType
    };
}