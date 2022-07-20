import { 
    useProjectAddTeam,
    useProjectDelete,
    useProjectUpdate,
    useProjectCreate,
    useProjectTeamSuggestion,
    useProjectGet
} from "../services/user";

export const useProject = (formData, handleSuccess, handleFailure) => {

    const getProjectsWithFilter = async(e, page = 1) => {
        e && e.preventDefault();
        const res = await useProjectGet({...formData, page});
        if(res && res.data) {
            if(res.data.data) return handleSuccess(res.data);
            else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    }

    const getTeamSuggestion = async(projectId) => {
        const res = await useProjectTeamSuggestion(projectId);
        if(res && res.data && res.data.data) return res.data;
        else return false;
    }

    const addTeamMember = async(e) => {
        e.preventDefault();
        const res = await useProjectAddTeam(formData);
        if(res && res.data && res.data.success) return handleSuccess(res.data.message);
        else return handleFailure(res.data.message);
    }

    
    const createProject = async(e) => {
        e.preventDefault();
        const res = await useProjectCreate(formData);
        if(res && res.data) {

            if(res.data.data) return handleSuccess(res.data);

            else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    }

    const updateProject = async(e) => {
        e.preventDefault();
        const res = await useProjectUpdate(formData);
        if(res && res.data) {

            if(res.data.data) return handleSuccess(res.data.data);

            else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    }

    const deleteProject = async(e) => {
        e.preventDefault();
        const res = await useProjectDelete(formData);
        if(res && res.data) {

            if(res.data.message) return handleSuccess(res.data.message);

            else return handleFailure(res.data.message);

        } else return handleFailure("Something went wrong");
    }

    return {
        getProjectsWithFilter,
        getTeamSuggestion,
        addTeamMember,
        createProject,
        updateProject,
        deleteProject
    };
}