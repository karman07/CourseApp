import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import ViewUser from './_viewCourses';
import AddUser from './_addCourse';
import EditUser from './_editCourse';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import BASE_URL from '../Base/Base';

function Courses() {
    const [users, setUsersList] = useState([]);
    const [showViewMode, setShowViewMode] = useState(false);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/courses`);
            if (response) {
                setUsersList(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const actionsTemplate = (rowDate) => {
        return (
            <>
                <button className='btn btn-success my-1' onClick={() => {
                    setSelectedUserId(rowDate._id);
                    setShowViewMode(true);
                }}>
                    <i className='pi pi-eye'></i>
                </button>
                <button className='btn btn-primary my-1' onClick={() => {
                    setSelectedUserId(rowDate._id);
                    setShowEditMode(true);
                }}>
                    <i className='pi pi-file-edit'></i>
                </button>
                <button className='btn btn-danger my-1' onClick={() => deleteUserConfirm(rowDate._id)}>
                    <i className='pi pi-trash'></i>
                </button>
            </>
        );
    };

    const deleteUserConfirm = (_id) => {
        confirmDialog({
            message: 'Are you sure you want to delete this course?',
            header: 'Confirmation',
            icon: 'pi pi-trash',
            accept: () => deleteUser(_id),
        });
    };

    const deleteUser = async (_id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/courses/` + _id);
            if (response) {
                getAllUsers();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const imageTemplate = (rowData) => {
        return (
            <img
                src={rowData.image}
                alt={rowData.name}
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            />
        );
    };

    return (
        <div className='users-page'>
            <div className='container'>
                <div className='users-list'>
                    <div className='addNewUser'>
                        <button className='btn btn-success' onClick={() => setShowAddMode(true)}>
                            Add New Course <i className='my-2 pi pi-plus'></i>
                        </button>
                    </div>
                    <DataTable value={users}>
                        <Column field="name" header="Name"></Column>
                        <Column
                            field="description"
                            header="Description"
                            body={(rowData) => truncateText(rowData.description, 60)}
                        ></Column>
                        <Column field="price" header="Price"></Column>
                        <Column header="Image" body={imageTemplate}></Column>
                        <Column field="type" header="Type"></Column>
                        <Column header="Actions" body={actionsTemplate}></Column>
                    </DataTable>
                </div>
            </div>
            <Dialog header="View Course Data"
                visible={showViewMode}
                style={{ width: '70vw' }}
                onHide={() => setShowViewMode(false)}>

                <ViewUser userId={selectedUserId} />
            </Dialog>

            <Dialog header="Add New Course"
                visible={showAddMode}
                style={{ width: '70vw' }}
                onHide={() => setShowAddMode(false)}>

                <AddUser setUserAdded={() => {
                    setShowAddMode(false);
                    getAllUsers();
                }} />
            </Dialog>

            <Dialog header="Edit Existing Course"
                visible={showEditMode}
                style={{ width: '70vw' }}
                onHide={() => setShowEditMode(false)}>

                <EditUser userId={selectedUserId} setUserEdited={() => {
                    setShowEditMode(false);
                    getAllUsers();
                }} />
            </Dialog>

            <ConfirmDialog />
        </div>
    );
}

export default Courses;
