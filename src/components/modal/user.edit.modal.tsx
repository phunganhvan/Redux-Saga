import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUserPending } from '../../redux/user/user.slide';
import Spinner from 'react-bootstrap/esm/Spinner';
import { toast } from 'react-toastify';

const UserEditModal = (props: any) => {
    const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser } = props;
    const [id, setId] = useState();

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");

    const dispatch = useAppDispatch();
    const isUpdating = useAppSelector((state) => state.user.isUpdating);
    const isUpdatingSuccess = useAppSelector((state) => state.user.isUpdatingSuccess);

    useEffect(() => {
        if (isUpdatingSuccess) {
            setIsOpenUpdateModal(false);
            // Optionally, you can show a success message here using a toast or alert
            toast.success("User updated successfully!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    }, [isUpdatingSuccess, setIsOpenUpdateModal]);
    useEffect(() => {
        if (dataUser?.id) {
            setId(dataUser?.id);
            setEmail(dataUser?.email);
            setName(dataUser?.name)
        }
    }, [dataUser])


    const handleSubmit = () => {
        if (!email) {
            alert("email empty");
            return;
        }
        if (!name) {
            alert("name empty");
            return;
        }
        dispatch(updateUserPending({ id: id!, email, name }));
    }

    return (
        <>
            <Modal
                show={isOpenUpdateModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={false}
                onHide={() => setIsOpenUpdateModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update A User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Name">
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    {isUpdating === false ? (
                        <>
                            <Button
                                variant='warning'
                                onClick={() => setIsOpenUpdateModal(false)} className='mr-2'>Cancel</Button>
                            <Button onClick={() => handleSubmit()}>Confirm</Button>

                        </>
                    ) : (
                        <>
                            <Button variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                &nbsp; Updating...
                            </Button>
                        </>
                    )
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserEditModal;