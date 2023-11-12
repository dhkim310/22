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
export const SelectApprovalDetailApi = async (id) => {
    try {
        const response = await axios.get(`/api/approval/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const ApprovalCountApi = async () => {
    try {
        const response = await axios.get('/api/approval');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const UpdateApprovalApi = async (id,updateData) => {
    return new Promise((resolve, reject) => {
        axios.put(`/api/approval/${id}`, updateData)
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            })
    });
}

export const approvalInsert = async (formData) => {
    try {
        const response = await axios.post('/api/approval', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};