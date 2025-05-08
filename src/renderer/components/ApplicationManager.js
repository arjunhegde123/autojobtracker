import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const ApplicationManager = () => {
    const [applications, setApplications] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingApplication, setEditingApplication] = useState(null);
    const [form] = Form.useForm();

    const fetchApplications = async () => {
        try {
            const response = await fetch('/api/applications');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            message.error('Failed to fetch applications');
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleAdd = () => {
        setEditingApplication(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingApplication(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/applications/${id}`, { 
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to delete');
            message.success('Application deleted successfully');
            fetchApplications();
        } catch (error) {
            message.error('Failed to delete application');
        }
    };

    const handleSubmit = async (values) => {
        try {
            const method = editingApplication ? 'PUT' : 'POST';
            const url = editingApplication 
                ? `/api/applications/${editingApplication.id}`
                : '/api/applications';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error('Failed to save');
            
            message.success(`Application ${editingApplication ? 'updated' : 'added'} successfully`);
            setIsModalVisible(false);
            fetchApplications();
        } catch (error) {
            message.error(`Failed to ${editingApplication ? 'update' : 'add'} application`);
        }
    };

    const columns = [
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Date Applied',
            dataIndex: 'date_applied',
            key: 'date_applied',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Last Updated',
            dataIndex: 'last_updated',
            key: 'last_updated',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                style={{ marginBottom: '16px' }}
            >
                Add Application
            </Button>

            <Table
                columns={columns}
                dataSource={applications}
                rowKey="id"
            />

            <Modal
                title={editingApplication ? 'Edit Application' : 'Add Application'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="company"
                        label="Company"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="position"
                        label="Position"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="Applied">Applied</Option>
                            <Option value="Interview">Interview</Option>
                            <Option value="Offer">Offer</Option>
                            <Option value="Rejected">Rejected</Option>
                            <Option value="Accepted">Accepted</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="notes"
                        label="Notes"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {editingApplication ? 'Update' : 'Add'}
                            </Button>
                            <Button onClick={() => setIsModalVisible(false)}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ApplicationManager; 