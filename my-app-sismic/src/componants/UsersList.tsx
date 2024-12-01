import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { useGlobalContext } from '../GlobalContext';

interface User {
    id: number;
    isActive: boolean;
    name: {
        first: string;
        last: string;
    };
    email: string;
    dob: {
        age: number;
    };
}

const UsersTable: React.FC = () => {
    const { users } = useGlobalContext();
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const [showActiveOnly, setShowActiveOnly] = useState<boolean>(true);

    // Function to toggle the filter for active users
    const handleActiveFilterChange = () => {
        if (showActiveOnly) {
            const activeUsers = users.filter(user => user.isActive);
            setFilteredUsers(activeUsers);
        } else {
            setFilteredUsers(users);
        }
        setShowActiveOnly(!showActiveOnly);
    };

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    return (
        <div>
            <Container>
                <h1>Users list</h1>
                <Table striped bordered size="sm">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th><Form.Check type="checkbox" id={`default-checkbox`} label={`isActive`} onClick={handleActiveFilterChange} /></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{`${user.name.first} ${user.name.last}`}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dob.age}</td>
                                    <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                                    <td></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>No users found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default UsersTable;