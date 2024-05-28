import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';

//create a redux store here with userSlice
const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

export default store;