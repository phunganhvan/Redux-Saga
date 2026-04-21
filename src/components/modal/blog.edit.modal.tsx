import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateBlogPending } from '../../redux/blog/blog.slide';
import Spinner from 'react-bootstrap/esm/Spinner';
import { toast } from 'react-toastify';
import { IBlog } from '../../types/backend';

interface IProps {
    isOpenUpdateModal: boolean;
    setIsOpenUpdateModal: (isOpen: boolean) => void;
    dataBlog: IBlog;
}
const BlogEditModal = (props: IProps) => {
    const { isOpenUpdateModal, setIsOpenUpdateModal, dataBlog } = props;
    const [id, setId] = useState<number>();

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const dispatch = useAppDispatch();

    const isUpdating = useAppSelector((state) => state.blog.isUpdating);
    const isUpdatingSuccess = useAppSelector((state) => state.blog.isUpdatingSuccess);

    useEffect(() => {
        if (isUpdatingSuccess) {
            setIsOpenUpdateModal(false);
            toast.success("Update blog successfully!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    }, [isUpdatingSuccess]);

    useEffect(() => {
        if (dataBlog?.id) {
            setId(dataBlog?.id);
            setTitle(dataBlog?.title);
            setAuthor(dataBlog?.author);
            setContent(dataBlog?.content);
        }
    }, [dataBlog])

    const handleSubmit = () => {
        if (!title) {
            alert("title empty");
            return;
        }
        if (!author) {
            alert("author empty");
            return;
        }
        if (!content) {
            alert("content empty");
            return;
        }
        dispatch(updateBlogPending({ id: id!, title, author, content }));
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
                        Update A Blog
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        label="Title"
                        className="mb-3"
                    >
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Author"
                        className="mb-3"
                    >
                        <Form.Control
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Content">
                        <Form.Control
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BlogEditModal;