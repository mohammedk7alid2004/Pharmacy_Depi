import { createContext, useContext, useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(secureLocalStorage.getItem('user'));

        if (token && userData && !user) {
            const email = userData.email;

            const fetchUserData = async () => {
                try {
                    const response = await fetch(`http://pharmacy1.runasp.net/api/Users/${email}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    setUser(data);
                    setIsAuth(data.roleId === 1);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserData();
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ isAuth, user }}>
            {children}
        </AuthContext.Provider>
    );
};