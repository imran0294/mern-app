import React, { use, useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            console.log(location.pathname);
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
                navigate('/Home', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])
    return (
        null
    )
}

export default RefreshHandler
