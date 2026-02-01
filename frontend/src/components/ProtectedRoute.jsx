import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constant.js";
import api from "../api.js";
import {useEffect, useState} from "react";

const ProtectedRoute = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch((error) => {
            console.error("Authorization error:", error);
            setIsAuthorized(false);
        });
    }, []);

    const refreshToken = async () => {
        const refresh_token = localStorage.getItem(REFRESH_TOKEN);
        try {
             const res = await api.post('api/token/refresh/', {refresh: refresh_token});   
             
             if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
             }else{
                setIsAuthorized(false);
             }

        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded=jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if(currentTime >= tokenExpiration){
            await refreshToken();
        }else{
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login"/>;
}

export default ProtectedRoute;