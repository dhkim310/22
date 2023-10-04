import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        empEmail: null,
        empId: null,
        empName: null,
        roles: []
    },
    reducers:{
        SET_USER_INFO: (state, action) => {
          state.empEmail = action.payload.email;
          state.empId = action.payload.id;
          state.empName = action.payload.name;
          state.roles = action.payload.roles;
          console.log(action.payload);
        },
        DELETE_USER_INFO: (state) => {
            state.empEmail = null;
            state.empId = null;
            state.empName = null;
            state.roles = [];
        },
    }
})

export const { SET_USER_INFO, DELETE_USER_INFO } = userInfoSlice.actions;

export default userInfoSlice.reducer;