import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

function DoctorForm({ onFinish, initivalValues }) {
    const { user } = useSelector((state) => state.user);

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                ...initivalValues,
                ...(initivalValues && {
                    timings: [
                        moment(initivalValues?.timings[0], "HH:mm"),
                        moment(initivalValues?.timings[1], "HH:mm"),
                    ],
                }),
            }}
        >
            <h1 className="card-title mt-3">Personal Information</h1>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                        label="First Name"
                        name="firstName"
                    >
                        <Input
                            style={{ cursor: "not-allowed" }}
                            defaultValue={user?.firstname}
                            readOnly
                            placeholder="First Name"
                        />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                    >
                        <Input
                            style={{ cursor: "not-allowed" }}
                            defaultValue={user?.lastname}
                            readOnly
                            placeholder="Last Name"
                        />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                    >
                        <Input
                            style={{ cursor: "not-allowed" }}
                            defaultValue={user?.mobileNumber}
                            readOnly
                            placeholder="Phone Number"
                        />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                        required
                        label="Website"
                        name="website"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Website" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                        required
                        label="Address"
                        name="address"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>
                </Col>
            </Row>
            <hr />
            <h1 className="card-title mt-3">Professional Information</h1>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                        required
                        label="Specialization"
                        name="specialization"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Specialization" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                        required
                        label="Experience"
                        name="experience"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Experience" type="number" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                        required
                        label="Fee Per Cunsultation"
                        name="feePerCunsultation"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Fee Per Cunsultation" type="number" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                        required
                        label="Timings"
                        name="timings"
                        rules={[{ required: true }]}
                    >
                        <TimePicker.RangePicker format="HH:mm" />
                    </Form.Item>
                </Col>
            </Row>

            <div className="d-flex justify-content-end">
                <Button className="register-button" htmlType="submit">
                    SUBMIT
                </Button>
            </div>
        </Form>
    );
}

export default DoctorForm;
