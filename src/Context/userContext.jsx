import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/users/authUser`, {
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
            });
            setAuthUser(response.data); 
            console.log(authUser);// Assuming the response contains user data
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []); // Fetch user once on component mount

    return (
        <UserContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </UserContext.Provider>
    );
}
