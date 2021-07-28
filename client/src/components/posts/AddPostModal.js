import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/esm/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
    //Context
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
        useContext(PostContext)

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'To Learn',
    })

    const { title, url, description } = newPost

    const onChangeNewPostForm = (event) => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const { success, message } = await addPost(newPost)
        closeDialog()
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        })
    }

    const closeDialog = () => {
        setNewPost({ title: '', description: '', url: '', status: 'To Learn' })
        setShowAddPostModal(false)
    }
    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title id="test">What do you want to learn?</Modal.Title>
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
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="m-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            row={3}
                            name="description"
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group className="m-3">
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Learn It!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal
