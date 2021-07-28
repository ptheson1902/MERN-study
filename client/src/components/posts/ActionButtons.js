import Button from 'react-bootstrap/esm/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { useContext } from 'react'
import { PostContext } from '../../contexts/PostContext'

const ActionButtons = ({ url, _id }) => {
    const { findPost, setShowUpdatePost, setShowDeletePost } =
        useContext(PostContext)

    const choosePost = (postId) => {
        findPost(postId)
        setShowUpdatePost(true)
    }

    const chooseDeletePost = (postId) => {
        findPost(postId)
        setShowDeletePost(true)
    }
    return (
        <>
            <Button className="post-button" href={url} target="_blank">
                <img src={playIcon} alt="play" width="32" height="32" />
            </Button>
            <Button
                className="post-button"
                onClick={choosePost.bind(this, _id)}
            >
                <img src={editIcon} alt="edit" width="24" height="24" />
            </Button>
            <Button
                className="post-button"
                onClick={chooseDeletePost.bind(this, _id)}
            >
                <img src={deleteIcon} alt="delete" width="24" height="24" />
            </Button>
        </>
    )
}

export default ActionButtons
