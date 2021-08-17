import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import '../../assets/styles/styles.css';
import MaterialTable from 'material-table';
import { 
    Modal, 
    Button, 
    Dropdown, 
    DropdownButton,
    Form,
    Row,
    Col,
 } from 'react-bootstrap';
 import useListenSupabase from 'hooks/useListenUser';
import { render } from 'react-dom';

const ChannelManagement = () => {
    useListenSupabase('trx_rooms','*', (payload) =>{
        fetchChannels();
    })

    useListenSupabase('mst_users','*', (payload) =>{
        fetchUsers();
    })

   const [users, setUsers] = useState([]);
   const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        photo_url: null,
        role_id: '',
        is_mental_illnes: false
    });
   const [channels, setChannels] = useState([]);
   const [channel, setChannel] = useState({
                                id: '',
                                host_room: '',
                                mst_users: {
                                    id: '',
                                    name: ''
                                },
                                name: '',
                                description: '',
                                active_status: true,
                                current_capality: 0,
                                total_capality: 0,
                                create_at: null,
                                update_at: null
                            });
    const { id, 
        host_room,
        name, 
        description, 
        active_status, 
        current_capality, 
        total_capality,
        create_at,
        update_at
    } = channel;
                    
   const [readonly, setreadOnly] = useState(false);
   const [isInsertMode, setisInsertMode] = useState(false);
   const [showUpdate, setShowUpdate] = useState(false);
   const handleCloseUpdate = () => { 
        setShowUpdate(false); 
        setisInsertMode(false); 
        setreadOnly(false); 

        setChannel({
            id: '',
            mst_users: {
                id: '',
                name: ''
            },
            name: '',
            description: '',
            active_status: true,
            current_capality: 0,
            total_capality: 0,
            create_at: null,
            update_at: null,
        })
    };
   const handleShowUpdate = (id, host_id, viewState) => {
        setChannel({...channel, host_room: host_id })   
        fetchChannel(id); 
       setShowUpdate(true); 
       setreadOnly(viewState);
    
    };

    const handleShowCreate = () => {
        setChannel({
            id: '',
            mst_users: {
                id: '',
                name: ''
            },
            name: '',
            description: '',
            active_status: true,
            current_capality: 0,
            total_capality: 0,
            create_at: null,
            update_at: null,
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

        setChannel({
            id: '',
            mst_users: {
                id: '',
                name: ''
            },
            name: '',
            description: '',
            active_status: true,
            current_capality: 0,
            total_capality: 0,
            create_at: null,
            update_at: null,
        });
    }
   const handleShowDelete = (channelId) => { 
       setChannel({...channel, id: channelId });
       setShowDelete(true);
    };

    const columns = [
        {
            title: 'No.', 
            field: 'id',
            width: "10%",
            render: (data) => data.tableData.id+1
        },
        {
            title: 'Room Name', 
            field: 'name'
        },
        {
            title: 'Room Host', 
            field: 'mst_users',
            render: (data) => data.mst_users.name
        },
        {
            title: 'Description', 
            field: 'description'
        },
        {
            title: 'Current Capacity', 
            field: 'current_capality',
            render: (data) => {
                return data.current_capality == null ? 0 : data.current_capality 
            }
        },
        {
            title: 'Total Capacity', 
            field: 'total_capality',
            render: (data) => {
                return data.total_capality == null ? 0 : data.total_capality 
            }
        },
        {
            title: 'Status', 
            field: 'active_status',
            render: (data) => {

                return data.active_status ? 'Aktif' : 'Nonaktif';
            }
        },
        {
            title: 'Action', 
            render: rowData => 
            <DropdownButton id="dropdown-basic-button" title="Action">
                 <Dropdown.Item onClick={() => handleShowUpdate(rowData.id, rowData.host_room,true)}>Lihat</Dropdown.Item>
                <Dropdown.Item onClick={() => handleShowUpdate(rowData.id, rowData.host_room, false)}>Edit</Dropdown.Item>
                <Dropdown.Item className='text-danger' onClick={() => handleShowDelete(rowData.id)}>Delete</Dropdown.Item>
            </DropdownButton>
        },
    ];

    useEffect(() => {
        fetchChannels();
        fetchUsers();
    }, [])

    async function fetchUsers()
    {
        const { data } = await supabase
            .from('mst_users')
            .select(`id, name, email, photo_url, role_id, is_mental_illnes, created_at`)
            .order('name, created_at', { ascending: true });
        console.log(data);
        setUsers(data);
    }

    async function fetchChannels() 
    {
        const { data } = await supabase
            .from('trx_rooms')
            .select(`id, host_room, name, description, current_capality, mst_users:host_room (name), total_capality, active_status, create_at`)
            .order('name, create_at', { ascending: true });
        setChannels(data);
    }

    async function fetchChannel(channelId) {
        const { data } = await supabase
            .from('trx_rooms')
            .select(`id, mst_users:host_room(id, name), name, description, active_status, 
                    current_capality, total_capality, create_at`)
            .eq('id', channelId);
        console.log(data[0])
        setChannel(data[0]);
    }

    async function updateChannel()
    {

        const { data } = await supabase
                    .from('trx_rooms')
                    .update({  
                        id,
                        host_room,
                        name,
                        description,
                        current_capality,
                        total_capality,
                        create_at,
                        active_status
                    })
                    .eq('id', id);

        setChannel({
            id: '',
            mst_users: {
                id: '',
                name: ''
            },
            name: '',
            description: '',
            active_status: true,
            current_capality: 0,
            total_capality: 0,
            create_at: null,
            update_at: null,
        });

        handleCloseUpdate();
    }

    async function createChannel() {

        // channel({...channel, active_status: true})
        console.log(                {
            name,
            host_room,
            description,
            active_status,
            current_capality,
            total_capality,
            create_at,
        })

        await supabase
            .from('trx_rooms')
            .insert([
                {
                    channel,
                    host_room,
                    description,
                    active_status: true,
                    current_capality,
                    total_capality,
                    create_at,
                }
            ]).single();

        setChannel({
            id: '',
            mst_users: {
                id: '',
                name: ''
            },
            name: '',
            description: '',
            active_status: true,
            current_capality: 0,
            total_capality: 0,
            create_at: null,
            update_at: null
        });

        handleCloseUpdate();
    }

    async function deleteChannel(channelId)
    {
        console.log(channelId);

        await supabase
            .from('trx_rooms')
            .delete()
            .eq('id', channelId);
        
        handleCloseDelete();
    }

    return(
        <div>
            <h2 className='sub-title'>Channel Management</h2>
            <div className='separator'></div>
            <Button variant="success" className='mb-4' onClick={() => handleShowCreate()}>Create Channel</Button>
            <div>
                <MaterialTable 
                 title=''
                 data={channels}
                 columns={columns}/>
            </div>

            <Modal show={showUpdate} onHide={handleCloseUpdate} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>{isInsertMode ? 'Create Channel' : readonly ? 'Detail Channel' : 'Edit Channel'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                            Status
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Select 
                                    value={active_status}
                                    onChange={e => setChannel({ ...channel, active_status: e.target.value})}
                                    disabled={readonly ? true : false}>
                                    <option value={true} selected> Aktif </option>  
                                    <option value={false} selected> Nonaktif </option> 
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>
                                Room Name
                                </Form.Label>
                                <Col sm={10}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Room Name" 
                                    value={name}
                                    onChange={e => setChannel({ ...channel, name: e.target.value})}
                                    disabled={readonly ? true : false}/>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>
                                Host Room
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Select 
                                        value={host_room}
                                        onChange={e => setChannel({ ...user, host_room: e.target.value})}
                                        disabled={isInsertMode ? false : true}>
                                        <option value='' selected>-- Pilih Host --</option>  
                                        {
                                            users.map((data) => (
                                                <option value={data.id}>{data.name}</option>       
                                            ))
                                        }
                                    </Form.Select>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>
                                Description
                                </Form.Label>
                                <Col sm={10}>
                                <Form.Control 
                                    type="text" 
                                    as='textarea'
                                    rows={3}
                                    placeholder="Description" 
                                    value={description}
                                    onChange={e => setChannel({ ...channel, description: e.target.value})}
                                    disabled={readonly ? true : false}/>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" hidden={isInsertMode}>
                                <Form.Label column sm={2}>
                                Current Capacity
                                </Form.Label>
                                <Col sm={10}>
                                <Form.Control 
                                    type="number"
                                    placeholder="Description" 
                                    value={current_capality}
                                    disabled={true}/>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                            Total Capacity
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Select 
                                    value={total_capality}
                                    onChange={e => setChannel({ ...channel, total_capality: e.target.value})}
                                    disabled={readonly ? true : false}>
                                    <option value='' selected>-- Pilih Kapasitas --</option>  
                                    <option value='5' selected> 5 </option> 
                                    <option value='10' selected> 10 </option> 
                                    <option value='15' selected> 15 </option> 
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => isInsertMode ? createChannel() : updateChannel(channel)} hidden={readonly}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Channel</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Ada Yakin Mengahapus Data ini?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => deleteChannel(id)}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ChannelManagement;