import React from 'react';
import Button from 'react-bootstrap/Button';
import { ImCross } from "react-icons/im";

import { useGlobalContext } from '../GlobalContext';

interface DeleteButtonProps {
    userId: number;
}

const DeleteUser: React.FC<DeleteButtonProps> = ({ userId }) => {
    const { deleteUser } = useGlobalContext();

    const handleDelete = () => {
        deleteUser(userId);
    };

    return (
        <Button variant="danger" size="sm" onClick={handleDelete}><ImCross /></Button>
    );
};

export default DeleteUser;