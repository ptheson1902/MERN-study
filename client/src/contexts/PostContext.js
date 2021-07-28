import { createContext, useReducer } from 'react'
import { postReducer } from '../reducer/postReducer'
import {
    apiURL,
    POST_LOADED_SUCCESS,
    POST_LOADED_FAIL,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST,
} from './Constants'
import axios from 'axios'
import { useState } from 'react'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    //State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true,
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePost, setShowUpdatePost] = useState(false)
    const [showDeletePost, setShowDeletePost] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    })

    //Get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiURL}/post`)
            if (response.data.success) {
                dispatch({
                    type: POST_LOADED_SUCCESS,
                    payload: response.data.posts,
                })
            }
        } catch (error) {
            dispatch({
                type: POST_LOADED_FAIL,
            })
        }
    }

    // Add Post
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiURL}/post`, newPost)
            if (response.data.success) {
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post,
                })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error!!!' }
        }
    }

    // Delete post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiURL}/post/${postId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_POST,
                    payload: postId,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Find post when user is updating post
    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId)
        dispatch({
            type: FIND_POST,
            payload: post,
        })
    }

    // Update Post
    const updatePost = async (updatePost) => {
        try {
            const response = await axios.put(
                `${apiURL}/post/${updatePost._id}`,
                updatePost
            )
            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error!!!' }
        }
    }

    // Post Context Data
    const postContextData = {
        postState,
        showAddPostModal,
        setShowAddPostModal,
        getPosts,
        addPost,
        deletePost,
        updatePost,
        findPost,
        showToast,
        setShowToast,
        showUpdatePost,
        setShowUpdatePost,
        setShowDeletePost,
        showDeletePost,
    }

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider
