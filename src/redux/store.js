import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

useEffect(() => {
    const fetchUserData = async () => {
        try {
            const userData = await getUserData(); // Assume this function fetches user data
            dispatch(setUser(userData)); // Update Redux store with user data
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    fetchUserData();
}, [dispatch]);

