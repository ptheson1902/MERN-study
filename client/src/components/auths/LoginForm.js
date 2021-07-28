import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layouts/AlertMessage'

const LoginForm = () => {
    // Context
    const { loginUser } = useContext(AuthContext)

    const [alert, setAlert] = useState(null)

    // local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const { username, password } = loginForm
    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const login = async (event) => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (!loginData.success) {
                setAlert({ type: 'danger', message: loginData.message })
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Form onSubmit={login}>
            <AlertMessage info={alert} />
            <Form.Group className="mt-4">
                <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    value={username}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>
            <Form.Group className="mt-4">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-4">
                Login
            </Button>
            <p className="mt-4">
                Don't have an account?
                <Link to="/register" className="m-4">
                    <Button variant="danger">Register</Button>
                </Link>
            </p>
        </Form>
    )
}

export default LoginForm
