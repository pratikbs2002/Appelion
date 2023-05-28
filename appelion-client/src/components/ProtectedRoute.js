import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function ProtectedRoute(props) {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post(
                "http://34.131.197.1/api/user/get-user-info-by-id",
                { token: sessionStorage.getItem("token") },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                sessionStorage.setItem("role", response.data.data.role);
                dispatch(setUser(response.data.data));
            } else {
                sessionStorage.clear()
                navigate("/login");
            }
        } catch (error) {
            dispatch(hideLoading());
            sessionStorage.clear()
            navigate("/login");
        }
    };

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, []);

    if (sessionStorage.getItem("token")) {
        let pathName = window.location.pathname;
        if (user?.isEmailVerified === false && pathName !== "/email-not-verified") {
            return <Navigate to="/email-not-verified" />;
        }
        let role = sessionStorage.getItem('role');
        if (pathName.includes("/admin")) {
            if (role === "admin") {
                return props.children;
            }
            else {
                return <Navigate to="/not-found" />;
            }
        }
        else if (pathName.includes("/user")) {
            if (role === "user") {
                return props.children;
            }
            else {
                return <Navigate to="/not-found" />;
            }
        }
        else if (pathName.includes("/doctor")) {
            if (role === "doctor") {
                return props.children;
            }
            else {
                return <Navigate to="/not-found" />;
            }
        }
        else {
            return props.children;
        }
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
