import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddUser from '../componants/AddUser';
import { useGlobalContext } from '../GlobalContext';


jest.mock('../GlobalContext', () => ({
    useGlobalContext: jest.fn(),
}));

describe('AddUser Component', () => {
    it('should display validation errors when the form is submitted with invalid data', async () => {
        const addUserMock = jest.fn();

        (useGlobalContext as jest.Mock).mockReturnValue({
            users: [],
            setUsers: jest.fn(),
            addUser: addUserMock,
            deleteUser: jest.fn(),
        });

        render(<AddUser />);

        fireEvent.click(screen.getByText(/Add new user/i));
        fireEvent.click(screen.getByText(/Add user/i));

        expect(await screen.findByText(/First name is required./)).toBeInTheDocument();
        expect(await screen.findByText(/Last name is required./)).toBeInTheDocument();
        expect(await screen.findByText(/Email is required./)).toBeInTheDocument();
        expect(await screen.findByText(/Age is required./)).toBeInTheDocument();
    });
});