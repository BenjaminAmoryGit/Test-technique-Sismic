import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useGlobalContext } from '../GlobalContext';

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    age: string;
    isActive: boolean;
}

interface FormErrors {
    firstname?: string;
    lastname?: string;
    email?: string;
    age?: string;
    isActive?: boolean;
}

const AddUser: React.FC = () => {
    const { addUser } = useGlobalContext();
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState<FormData>({
        firstname: '',
        lastname: '',
        email: '',
        age: '',
        isActive: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!formData.firstname.trim()) {
            newErrors.firstname = 'First name is required.';
        }

        if (!formData.lastname.trim()) {
            newErrors.lastname = 'Last name is required.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }

        const ageNumber = parseInt(formData.age, 10);
        if (!formData.age.trim()) {
            newErrors.age = 'Age is required.';
        } else if (isNaN(ageNumber)) {
            newErrors.age = 'Age must be a number.';
        } else if (ageNumber < 18 || ageNumber > 100) {
            newErrors.age = 'Age must be between 18 and 100.';
        }

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeIsActive = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            isActive: e.currentTarget.checked,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            addUser(formData);
            setShow(false);
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                age: '',
                isActive: false,
            });
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add user
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>First name</Form.Label>
                            <Form.Control id="firstname"
                                name="firstname" value={formData.firstname}
                                onChange={handleChange} type="text" placeholder="First name" />
                            {errors.firstname && <div style={{ color: 'red' }}>{errors.firstname}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control id="lastname"
                                name="lastname" value={formData.lastname}
                                onChange={handleChange} type="text" placeholder="Last name" />
                            {errors.lastname && <div style={{ color: 'red' }}>{errors.lastname}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control id="age"
                                name="age"
                                onChange={handleChange} type="text" placeholder="Age" />
                            {errors.age && <div style={{ color: 'red' }}>{errors.age}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control id="email"
                                name="email"
                                onChange={handleChange} type="text" placeholder="Email" />
                            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type='checkbox'
                                id='isActive'
                                label='isActive'
                                onChange={handleChangeIsActive}
                            />
                        </Form.Group>
                        <Button style={{ float: "right" }} type="submit">Add user</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddUser;