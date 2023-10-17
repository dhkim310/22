import axios from "axios";

export const SelectApprovalWaitListApi = async (page) => {
    try {
        const response = await axios.get(`/api/approval/wait?page=${page}`);
        if(response.data.approvalBackDate===null) {
        response.data.approvalBackDate=""
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const SelectApprovalSuccessListApi = async (page) => {
    try {
        const response = await axios.get(`/api/approval/success?page=${page}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};