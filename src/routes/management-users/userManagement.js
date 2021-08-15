import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import '../../assets/styles/styles.css';
import MaterialTable from 'material-table';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        name: '',
        email: '',
        photo_url: null,
        role_id: '',
        is_mental_illnes: false
    });

    const columns = [
        {
            title: 'Name', field: 'name'
        },
        {
            title: 'Email', field: 'email'
        },
        {
            title: 'Have Mental Illnes', 
            field: 'is_mental_illnes',
            render: rowData => rowData == false ? 'Tidak' : 'Ya'
        },
        {
            title: 'Action', 
            render: rowData => <button type="button" className="btn btn-primary">Action</button>
        },
    ];

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        console.log(users);

    }, [users]);

    async function fetchUsers()
    {
        const { data } = await supabase
            .from('mst_users')
            .select(`id, name, email, photo_url, role_id, is_mental_illnes`);
        setUsers(data);
        console.log(data)
     
    }

    return(
        <div>
            <h2 className='sub-title'>User Management</h2>
            <div className='separator'></div>
            <div>
                <MaterialTable 
                 title=''
                 data={users}
                 columns={columns}/>
            </div>
        </div>
    );
}

export default UserManagement;