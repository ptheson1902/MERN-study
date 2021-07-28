import React from 'react'
import { PostContext } from '../../contexts/PostContext'
import { useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DeletePost = () => {
    const {
        postState: { post },
        deletePost,
        setShowToast,
        showDeletePost,
        setShowDeletePost,
    } = useContext(PostContext)

    const closeDialog = () => {
        setShowDeletePost(false)
    }
    const onDelete = () => {
        deletePost(post._id)
        closeDialog()
        setShowToast({
            show: true,
            message: 'This work is deleted',
            type: 'success',
        })
    }

    return (
        <Modal show={showDeletePost} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title id="test">You sure want delete?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeDialog}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletePost
