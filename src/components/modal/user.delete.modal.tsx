import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteUserPending } from '../../redux/user/user.slide';
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { toast } from 'react-toastify';

const UserDeleteModal = (props: any) => {
    const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;

    const dispatch = useAppDispatch();


    const handleSubmit = () => {
        dispatch(deleteUserPending({ id: dataUser?.id }));
    }

    const isDeleting = useAppSelector((state) => state.user.isDeleting);
    const isDeletingSuccess = useAppSelector((state) => state.user.isDeletingSuccess);

    useEffect(() => {
        if (isDeletingSuccess) {
            setIsOpenDeleteModal(false);

            toast.success("Delete user successfully!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    }, [isDeletingSuccess, setIsOpenDeleteModal]);

    return (
        <Modal
            show={isOpenDeleteModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            onHide={() => setIsOpenDeleteModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete A User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the user: {dataUser?.email ?? ""}
            </Modal.Body>
            <Modal.Footer>
                {isDeleting === false ? (
                    <>
                        <Button
                            variant='warning'
                            onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                        <Button onClick={() => handleSubmit()}>Confirm</Button>
                    </>
                ) : (
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        &nbsp; Deleting...
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    )
}

export default UserDeleteModal;