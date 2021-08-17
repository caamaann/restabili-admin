import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import '../../assets/styles/styles.css';
import MaterialTable from 'material-table';
import { Modal, 
    Button, 
    Dropdown, 
    DropdownButton,
    Form,
    Row,
    Col,
} from 'react-bootstrap';
import useListenSupabase from 'hooks/useListenUser';

const UserManagement = () => {
    useListenSupabase('mst_users','*', (payload) =>{
        fetchUsers();
    })

    useListenSupabase('mst_roles','*', (payload) =>{
        fetchRoles();
    })

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        photo_url: null,
        role_id: '',
        is_mental_illnes: false
    });
    const { id, name, email, photo_url, role_id, is_mental_illnes } = user;
    const [readonly, setreadOnly] = useState(false);
    const [isInsertMode, setisInsertMode] = useState(false);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => { 
        setShowUpdate(false); 
        setisInsertMode(false); 
        setreadOnly(false); 

        setUser({
            id: '',
            name: '',
            email: '',
            photo_url: null,
            role_id: '',
            is_mental_illnes: false
        });
    }
    const handleShowUpdate = (id, viewState) => {
        fetchUser(id);
        setShowUpdate(true);
        setreadOnly(viewState);
    };

    const handleShowCreate = () => {
        setUser({
            id: '',
            name: '',
            email: '',
            photo_url: null,
            role_id: '',
            is_mental_illnes: false
        });
        setisInsertMode(true);
        setShowUpdate(true);
        setreadOnly(false);
    };

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => { 
        setShowDelete(false); 
        setisInsertMode(false); 
        setreadOnly(false); 

        setUser({
            id: '',
            name: '',
            email: '',
            photo_url: null,
            role_id: '',
            is_mental_illnes: false
        });
    }
    const handleShowDelete = (UserId) => {
        setUser({ ...user, id: UserId });
        setShowDelete(true);
    }

    const columns = [
        {
            title: 'No.', 
            field: 'id',
            render: (data) => data.tableData.id+1
        },
        {
            title: 'Name', field: 'name'
        },
        {
            title: 'Email', field: 'email'
        },
        {
            title: 'Role',
            field: 'mst_roles',
            render: (data) => capitalizeFirstLetter(data.mst_roles.nama)
        },
        {
            title: 'Have Mental Illnes', 
            field: 'is_mental_illnes',
            render: rowData => {

                return rowData.is_mental_illnes == false ? 'No' : 'Yes'
            }
        },
        {
            title: 'Created At', field: 'created_at'
        },
        {
            title: 'Action', 
            field: 'id',
            render: rowData => 
            <DropdownButton id="dropdown-basic-button" title="Action">
                <Dropdown.Item onClick={() => handleShowUpdate(rowData.id, true)}>Lihat</Dropdown.Item>
                <Dropdown.Item onClick={() => handleShowUpdate(rowData.id, false)}>Edit</Dropdown.Item>
                <Dropdown.Item className='text-danger' onClick={() => handleShowDelete(rowData.id)}>Delete</Dropdown.Item>
            </DropdownButton>
        },
    ];

    useEffect(() => {

        fetchUsers();
        fetchRoles();
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    async function fetchUsers()
    {
        const { data } = await supabase
            .from('mst_users')
            .select(`id, name, email, photo_url, mst_roles:role_id(id, nama), is_mental_illnes, created_at`)
            .order('name, created_at', { ascending: true });

        setUsers(data);
    }

    async function fetchUser(id)
    {
        const { data } = await supabase
            .from('mst_users')
            .select(`id, name, email, photo_url, role_id, is_mental_illnes`)
            .eq('id', id)
        
        setUser(data[0]);  
    }

    async function fetchRoles()
    {
        const { data } = await supabase
            .from('mst_roles')
            .select()
            .order('nama', { ascending: true });
        setRoles(data);
    }

    async function updateUser()
    {
        const { data } = await supabase
            .from('mst_users')
            .update({ id, name, email, photo_url, role_id, is_mental_illnes })
            .eq('id', id);

        setUser({
            id: '',
            name: '',
            email: '',
            photo_url: null,
            role_id: '',
            is_mental_illnes: false
        });

        handleCloseUpdate();
    }

    async function deleteUser(id)
    {
        const { data } = await supabase
            .from('mst_users')
            .delete()
            .eq('id', id);
        
        handleCloseDelete();
        
        return data;
    }

    async function createUser()
    {
        await supabase
            .from('mst_users')
            .insert([
                {
                    name,
                    email,
                    photo_url,
                    role_id,
                    is_mental_illnes
                }
            ]).single();

        setUser({
            id: '',
            name: '',
            email: '',
            photo_url: null,
            role_id: '',
            is_mental_illnes: false
        });

        handleCloseUpdate();
    }

    return(
        <div>
            <h2 className='sub-title'>User Management</h2>
            <div className='separator'></div>
            <Button variant="success" className='mb-4' onClick={() => handleShowCreate()}>Create User</Button>
            <div>
                <MaterialTable 
                 title=''
                 data={users}
                 columns={columns}/>
            </div>
        
            <Modal show={showUpdate} onHide={handleCloseUpdate} size='lg'> 
                <Modal.Header closeButton>
                <Modal.Title>{isInsertMode ? 'Create User' : readonly ? 'Detail User' : 'Edit User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                            Name
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control 
                                type="text" 
                                placeholder="Name" 
                                value={user.name}
                                onChange={e => setUser({ ...user, name: e.target.value})}
                                disabled={readonly ? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Email
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control 
                                type="email" 
                                placeholder="Email" 
                                value={user.email}
                                onChange={e => setUser({ ...user, email: e.target.value})}
                                disabled={readonly ? true : false}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Role
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Select 
                                 value={user.role_id}
                                 onChange={e => setUser({ ...user, role_id: e.target.value})}
                                 disabled={readonly ? true : false}>
                                <option value='' selected>-- Pilih Role --</option>  
                                {
                                    roles.map((data) => (
                                        <option value={data.id}>{data.nama}</option>       
                                    ))
                                }
                            </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Have Mental Illnes
                            </Form.Label>
                            <Col sm={10}>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Ya"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        value={true}
                                        checked={isInsertMode ? true : user.is_mental_illnes == true ? true : false}
                                        disabled={readonly ? true : false}/>
                                    <Form.Check
                                        inline
                                        label="Tidak"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        value={false}
                                        checked={isInsertMode ? true : user.is_mental_illnes == false ? true : false}
                                        disabled={readonly ? true : false}
                                    />
                                </div>
                            ))}
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => isInsertMode ? createUser() : updateUser(user)} hidden={readonly}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Ada Yakin Mengahapus Data ini?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => deleteUser(id)}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserManagement;