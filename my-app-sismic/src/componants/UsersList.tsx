import React, { useState, useEffect } from 'react';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaSearch } from "react-icons/fa";

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

const UsersList: React.FC = () => {
    const { users } = useGlobalContext();
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const [showActiveOnly, setShowActiveOnly] = useState<boolean>(true);

    // Function to toggle the filter for active users
    const handleActiveFilterChange = () => {

        if (showActiveOnly) {
            // Show only active users
            const activeUsers = users.filter(user => user.isActive);
            setFilteredUsers(activeUsers);
        } else {
            // Show all users
            setFilteredUsers(users);
        }
        setShowActiveOnly(!showActiveOnly);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;

        // Filter users based on search query (case insensitive)
        const filtered = users.filter(user =>
            `${user.name.first} ${user.name.last}`.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredUsers(filtered);
    };

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    return (
        <div>
            <Container>
                <h1>Users list</h1>
                <Row>
                    <Col md="auto">
                        <InputGroup className="mb-4" onChange={handleSearchChange}>
                            <Form.Control
                                placeholder="Search by name or email"
                                aria-label="Search by name or email"
                                aria-describedby="basic-addon1"
                            />
                            <Button variant="outline-secondary" id="button-addon1">
                                <FaSearch />
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col xs lg="2">
                        <AddUser />
                    </Col>
                </Row>

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
                                    <td style={{ textAlign: 'center' }}><DeleteUser userId={user.id} /></td>
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

export default UsersList;