import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'

import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const NavBarMenu = () => {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext)

    const logout = () => logoutUser()

    // logo style
    const logoStyle = {
        with: '40px',
        height: '40px',
        margin: '0 5px',
    }

    const logOutStyle = {
        with: '24px',
        height: '24px',
        margin: '0 5px',
    }
    // text style
    const styleText = 'font-weight-bolder text-white'
    return (
        <Navbar
            expand="lg"
            bg="danger"
            variant="dark"
            className="shadow"
            style={{ padding: '10px' }}
        >
            <Navbar.Brand className="font-weight-bolder text-white">
                <img src={learnItLogo} alt="Logo" style={logoStyle} />
                LearnIt
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-between"
            >
                <Nav className="mr-auto" variant="tabs">
                    <Nav.Item>
                        <Nav.Link
                            className={styleText}
                            to="/dashboard"
                            as={Link}
                        >
                            Dashboard
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link className={styleText} to="/about" as={Link}>
                            About
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav className="align-items-center">
                    <Nav.Link className={styleText} disabled>
                        Welcome {username}
                    </Nav.Link>
                    <Button
                        variant="success"
                        className={styleText}
                        onClick={logout}
                    >
                        <img
                            src={logoutIcon}
                            alt="logoutIcon"
                            style={logOutStyle}
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarMenu
