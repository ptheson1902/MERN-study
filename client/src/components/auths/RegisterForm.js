import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layouts/AlertMessage'
import { useHistory } from 'react-router-dom'

const RegisterForm = () => {
    // Context
    const { registerUser } = useContext(AuthContext)

    const [alert, setAlert] = useState(null)

    // local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })
    const { username, password, confirmPassword } = registerForm
    const onChangeRegisterForm = (event) =>
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        })
    const history = useHistory()
    const register = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Passwords do not match' })
            setTimeout(() => setAlert(null), 3000)
        } else
            try {
                const registerData = await registerUser(registerForm)
                if (!registerData.success) {
                    setAlert({ type: 'danger', message: registerData.message })
                    setTimeout(() => setAlert(null), 3000)
                } else {
                    setAlert({ type: 'success', message: registerData.message })
                    setTimeout(() => {
                        setAlert(null)
                        history.push('/login')
                    }, 2000)
                }
            } catch (error) {
                console.log(error)
            }
    }

    return (
        <Form onSubmit={register}>
            <AlertMessage info={alert} />
            <Form.Group className="mt-4">
                <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    value={username}
                    onChange={onChangeRegisterForm}
                />
            </Form.Group>
            <Form.Group className="mt-4">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={onChangeRegisterForm}
                />
            </Form.Group>
            <Form.Group className="mt-4">
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={onChangeRegisterForm}
                />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-4">
                Register
            </Button>
            <p className="mt-4">
                Already have an account?
                <Link to="/login" className="m-4">
                    <Button variant="danger">Login</Button>
                </Link>
            </p>
        </Form>
    )
}

export default RegisterForm
