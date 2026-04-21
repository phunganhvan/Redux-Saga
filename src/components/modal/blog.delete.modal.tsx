import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteBlogPending } from '../../redux/blog/blog.slide';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Spinner from 'react-bootstrap/esm/Spinner';
import { IBlog } from '../../types/backend';

interface IProps {
    dataBlog: IBlog,
    isOpenDeleteModal: boolean,
    setIsOpenDeleteModal: (isOpen: boolean) => void,
}

const BlogDeleteModal = (props: IProps) => {
    const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;

    const dispatch = useAppDispatch();
    const isDeleting = useAppSelector((state) => state.blog.isDeleting);
    const isDeletingSuccess = useAppSelector((state) => state.blog.isDeletingSuccess);

    const handleSubmit = () => {
        dispatch(deleteBlogPending({ id: dataBlog?.id }));
    }
    useEffect(() => {
        if (isDeletingSuccess) {
            setIsOpenDeleteModal(false);
            toast.success("Delete blog successfully!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    }, [isDeletingSuccess]);

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
                    Delete A Blog
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the blog: {dataBlog?.title ?? ""}
            </Modal.Body>
            <Modal.Footer>
                {
                    isDeleting === false ? (
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
                    )
                }
            </Modal.Footer>

        </Modal>
    )
}

export default BlogDeleteModal;