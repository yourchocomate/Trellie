import { 
    useWorkSpaceCreate, 
    useWorkSpaceDelete, 
    useWorkSpaceGetAll, 
    useWorkSpaceGetProjects, 
    useWorkSpaceUpdate 
} from "../services/user";

export const useWorkSpace = (formData, handleSuccess, handleFailure) => {
    const getWorkSpaces = async() => {
        const res = await useWorkSpaceGetAll();
        if(res && res.data && res.data.data) return res.data;
        else return false;
    }

    const getWorkSpaceProjects = async(id) => {
        const res = await useWorkSpaceGetProjects(id);
        if(res && res.data && res.data.data) return res.data;
        else return false;
    }

    const createWorkSpace = async(e) => {
        e.preventDefault();
        const res = await useWorkSpaceCreate(formData);
        if(res && res.data) {

            if(res.data.data) return handleSuccess(res.data);

            else return handleFailure(res.data.message);

        } else return handleFailure(res.message);
    }

    const updateWorkSpace = async(e) => {
        e.preventDefault();
        const res = await useWorkSpaceUpdate(formData);
        if(res && res.data) {

            if(res.data.data) return handleSuccess(res.data);

            else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    }

    const deleteWorkSpace = async(e) => {
        e.preventDefault();
        const res = await useWorkSpaceDelete(formData);
        if(res && res.data) {

            if(res.data.message) return handleSuccess(res.data.message);

            else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    }

    return {
        getWorkSpaces,
        getWorkSpaceProjects,
        createWorkSpace,
        updateWorkSpace,
        deleteWorkSpace
    }
}