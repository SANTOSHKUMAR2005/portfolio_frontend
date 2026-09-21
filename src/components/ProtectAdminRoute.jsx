import React, { useState, useEffect } from 'react'
import { useData } from '../context/ContextAPI'
import { Navigate, useNavigate } from 'react-router'
import Spin from './Spin'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'


const ProtectAdminRoute = ({children}) => {

    const { adminLogOut } = useData();
    const [isAuthorized, setIsAuthorized] = useState(null);
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {

        try {
            if (!jwtToken) {
                toast.error("401! Authentication required for Admin Panel");
                setIsAuthorized(false);
                return;
            }

            const payload = jwtDecode(jwtToken);

            if (payload.role != 'admin') {
                toast.error("Unauthorized access! You are not admin");
                adminLogOut();
                setIsAuthorized(false);
                return;
            }

            setIsAuthorized(true);
        } catch (error) {
            console.log("errrorin token: ", error);
            toast.error("Invalid token");
            adminLogOut();
            navigate("/", { replace: true })
        }


    }, [])

    if (isAuthorized === null) {
        return (
            <>
                <div className='absolute inset-0 bg-black/20 backdrop-blur-md'>
                    <Spin w="10" />
                </div>
            </>
        )
    }

    if (isAuthorized === false) {
        <Navigate to='/' replace />
    }

    return children
}

export default ProtectAdminRoute