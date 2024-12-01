import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteUser from '../componants/DeleteUser';
import { useGlobalContext } from '../GlobalContext';

jest.mock('../GlobalContext', () => ({
    useGlobalContext: jest.fn(),
}));

describe('DeleteUser Component', () => {
    const deleteUserMock = jest.fn();

    beforeEach(() => {
        (useGlobalContext as jest.Mock).mockReturnValue({
            deleteUser: deleteUserMock,
            users: [
                { id: 10, name: { first: 'Ella', last: 'Roy' }, email: 'ella.roy@example.com', dob: { age: 30 }, isActive: true },
                { id: 11, name: { first: 'Ella', last: 'Roy' }, email: 'ella.roy@example.com', dob: { age: 30 }, isActive: true },
            ],
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('calls deleteUser with the correct dynamic user ID when clicked', () => {
        const userIdToDelete = 11;

        // Render the component for the user with a dynamic ID
        const { getByRole } = render(<DeleteUser userId={userIdToDelete} />);
        const button = getByRole('button');

        // Simulate a click on the delete button
        fireEvent.click(button);

        // Ensure deleteUser is called with the correct ID
        expect(deleteUserMock).toHaveBeenCalledTimes(1);
        expect(deleteUserMock).toHaveBeenCalledWith(userIdToDelete);
    });
});
