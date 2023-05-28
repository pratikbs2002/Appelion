import { Tabs } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

function Notifications() {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const markAllAsSeen = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                "http://34.131.197.1/api/user/mark-all-notifications-as-seen",
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            ).catch((error) => {
                if (error.response.status) {
                    toast.error('Session Expired');
                    sessionStorage.clear();
                    navigate("/login");
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    };

    const deleteAll = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                "http://34.131.197.1/api/user/delete-all-notifications",
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            ).catch((error) => {
                if (error.response.status) {
                    toast.error('Session Expired');
                    sessionStorage.clear();
                    navigate("/login");
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout>
            <h1 className="page-title">Notifications</h1>
            <hr />

            <Tabs>
                <Tabs.TabPane tab="Unseen" key={0}>
                    <div className="d-flex justify-content-end">
                        <button
                            onClick={() => markAllAsSeen()}
                            style={{
                                background: "none",
                                border: "1px solid black",
                                padding: "5px",
                                borderRadius: "4px",
                            }}
                        >
                            <IoCheckmarkDoneSharp style={{ marginRight: "5px", cursor: "pointer" }} /> Mark all
                            as seen
                        </button>
                    </div>

                    {user?.unseenNotifications.map((notification) => (
                        <div
                            className="card p-2 mt-2"
                            onClick={() => navigate(notification.onClickPath)}
                        >
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab="seen" key={1}>
                    <div className="d-flex justify-content-end">
                        <button
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "none",
                                border: "1px solid black",
                                padding: "5px",
                                borderRadius: "4px",
                            }}
                            onClick={() => deleteAll()}
                        >
                            <MdOutlineDelete style={{ marginRight: "5px" }} />
                            Delete all
                        </button>
                    </div>
                    {user?.seenNotifications.map((notification) => (
                        <div
                            className="card p-2 mt-2"
                            onClick={() => navigate(notification.onClickPath)}
                        >
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
}

export default Notifications;