import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/esm/Form'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePost = () => {
    //Context
    const {
        postState: { post },
        showUpdatePost,
        setShowUpdatePost,
        updatePost,
        setShowToast,
    } = useContext(PostContext)

    const [updatedPost, setUpdatedPost] = useState(post)

    useEffect(() => setUpdatedPost(post), [post])

    const { title, url, description, status } = updatedPost

    const onChangeUpdatedPostForm = (event) => {
        setUpdatedPost({
            ...updatedPost,
            [event.target.name]: event.target.value,
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const { success, message } = await updatePost(updatedPost)
        closeDialog()
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        })
    }

    const closeDialog = () => {
        setUpdatedPost(post)
        setShowUpdatePost(false)
    }
    return (
        <Modal show={showUpdatePost} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title id="test">Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="m-3">
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className="m-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            row={3}
                            name="description"
                            value={description}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className="m-3">
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className="m-3">
                        <Form.Control
                            as="select"
                            name="status"
                            value={status}
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option value="To Learn">To Learn</option>
                            <option value="Learning">Learning</option>
                            <option value="Learned">Learned</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePost
