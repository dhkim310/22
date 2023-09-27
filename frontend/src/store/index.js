import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './Auth';
import userInfoReducer from './UserInfo';

export default configureStore({
  reducer: {
      token: tokenReducer,
      userInfo: userInfoReducer
  },
});