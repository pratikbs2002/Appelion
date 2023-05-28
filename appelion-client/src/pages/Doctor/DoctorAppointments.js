import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading());
            const resposne = await axios.get(
                "http://34.131.197.1/api/doctor/get-appointments-by-doctor-id",
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
            if (resposne.data.success) {
                setAppointments(resposne.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const changeAppointmentStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const resposne = await axios.post(
                "http://34.131.197.1/api/doctor/change-appointment-status",
                { appointmentId: record._id, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                },
            ).catch((error) => {
                if (error.response.status) {
                    toast.error('Session Expired');
                    sessionStorage.clear();
                    navigate("/login");
                }
            });
            dispatch(hideLoading());
            if (resposne.data.success) {
                toast.success(resposne.data.message);
                getAppointmentsData();
            }
        } catch (error) {
            toast.error("Error changing doctor account status");
            dispatch(hideLoading());
        }
    };
    const columns = [
        {
            title: "Id",
            dataIndex: "_id",
        },
        {
            title: "Patient",
            dataIndex: "name",
            render: (text, record) => <span>{record.userInfo.username}</span>,
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
            render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
        },
        {
            title: "Date & Time",
            dataIndex: "createdAt",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")}{" "}
                    {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" && (
                        <div className="d-flex" style={{ gap: "10px" }}>
                            <div onClick={() => changeAppointmentStatus(record, "approved")}>
                                <FaCheckCircle
                                    style={{
                                        fontSize: "25px",
                                        color: "green",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                            <div onClick={() => changeAppointmentStatus(record, "rejected")}>
                                <FaTimesCircle
                                    style={{ fontSize: "25px", color: "red", cursor: "pointer" }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
    ];
    useEffect(() => {
        getAppointmentsData();
    }, []);
    return (
        <Layout>
            <h1 className="page-header">Appointments</h1>
            <hr />
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    );
}

export default DoctorAppointments;
