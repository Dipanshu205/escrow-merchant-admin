import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const Context = createContext();

const ContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState("");
    const navigate = useNavigate();



    // useEffect(() => {
    //     if (!token && localStorage.getItem("token")) {
    //         setToken(localStorage.getItem("token"));
    //     }
    // }, [token]);
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []); // empty dependency list


    const value = {
        token,
        setToken,
        backendUrl,
        navigate
    }

    return (
        <Context.Provider value={value}>{props.children}</Context.Provider>
    );
}

export default ContextProvider;