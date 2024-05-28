import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UserCrud = () => {
    const url = 'http://localhost:8080/api/users';

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({firstName: '', lastName: '', email: '', password: ''});
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(url);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const createUser = async () => {
        try {
            await axios.post(url, newUser);
            setNewUser({firstName: '', lastName: '', email: '', password: ''});
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const updateUser = async () => {
        try {
            await axios.put(url + '\\'+  `${editingUser.id}`, editingUser);
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(url + '\\' + `${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName} ({user.email})
                        <button onClick={() => setEditingUser(user)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Create User</h2>
            <input
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
            />
            <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
            <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            />
            <button onClick={createUser}>Create</button>

            {editingUser && (
                <>
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={editingUser.firstName}
                        onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={editingUser.lastName}
                        onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={editingUser.password}
                        onChange={(e) => setEditingUser({...editingUser, password: e.target.value})}
                    />
                    <button onClick={updateUser}>Update</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                </>
            )}
        </div>
    );
};

export default UserCrud;