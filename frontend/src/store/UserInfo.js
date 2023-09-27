import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        email: null,
        id: null,
        name: null,
        roles: []
    },
    reducers:{
        SET_USER_INFO: (state, action) => {
          state.email = action.payload.email;
          state.id = action.payload.id;
          state.name = action.payload.name;
          state.roles = action.payload.roles;
          console.log(action.payload);
        },
        DELETE_USER_INFO: (state) => {
            state.email = null;
            state.id = null;
            state.name = null;
            state.roles = [];
        },
    }
})

export const { SET_USER_INFO, DELETE_USER_INFO } = userInfoSlice.actions;

export default userInfoSlice.reducer;