import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import ViewUser from './_viewTraining';
import AddUser from './_addTraining';
import EditUser from './_editTraining';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import BASE_URL from '../Base/Base'

function Training() {
    const [users, setUsersList] = useState([]);
    const [showViewMode, setShowViewMode] = useState(false);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null)

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/training`);
            if (response) {
                setUsersList(response.data);
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const actionsTemplate = (rowDate) => {
        return (
            <>
                <button className='btn btn-success my-1' onClick={() => {
                    console.log(rowDate._id)
                    setSelectedUserId(rowDate._id)
                    setShowViewMode(true)
                }}>
                    <i className='pi pi-eye'></i>
                </button>
                <button className='btn btn-primary my-1' onClick={() => {
                    setSelectedUserId(rowDate._id)
                    setShowEditMode(true)
                }}>
                    <i className='pi pi-file-edit'></i>
                </button>
                <button className='btn btn-danger my-1' onClick={() => deleteUserConfirm(rowDate._id)}>
                    <i className='pi pi-trash'></i>
                </button>
            </>
        )
    }

    const deleteUserConfirm = (_id) => {
        confirmDialog({
            message: 'Are you sure you want to delete this user?',
            header: 'Confirmation',
            icon: 'pi pi-trash',
            accept: () => deleteUser(_id),
        });
    }

    const deleteUser = async (_id) =>{
        try{
            const response = await axios.delete(`${BASE_URL}/training/` + _id);
            if(response){
                getAllUsers();
            }
        }
        catch (e){
            console.log(e)
        }
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    return (
        <div className='users-page'>
            <div className='container'>
                <div className='users-list'>
                    <div className='addNewUser'>
                        <button className='btn btn-success' onClick={() => setShowAddMode(true)}>
                            Add New Training <i className='my-2 pi pi-plus'></i>
                        </button>
                    </div>
                    <DataTable value={users}>
                        <Column field="name" header="Name"></Column>
                        <Column 
                            field="description" 
                            header="Description" 
                            body={(rowData) => truncateText(rowData.description, 60)} // Truncate description to 30 characters
                        ></Column>
                        <Column field="price" header="Price"></Column>
                        <Column field="type" header="Type"></Column>
                        <Column field="image" header="Image" body={(rowData) => truncateText(rowData.image, 60)}></Column>
                        <Column header="Actions" body={actionsTemplate} ></Column>
                    </DataTable>
                </div>
            </div>
            <Dialog header="View Training Data"
                visible={showViewMode}
                style={{ width: '70vw' }}
                onHide={() => setShowViewMode(false)}>

                <ViewUser userId={selectedUserId} />
            </Dialog>

            <Dialog header="Add New Training"
                visible={showAddMode}
                style={{ width: '70vw' }}
                onHide={() => setShowAddMode(false)}>

                <AddUser setUserAdded={() => {
                    setShowAddMode(false);
                    getAllUsers();
                }} />
            </Dialog>

            <Dialog header="Edit Exist Training"
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
    )
}

export default Training;
