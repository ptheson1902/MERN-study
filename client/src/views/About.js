import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'

const About = () => {
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext)
    return <h1 className="mt-3">Hello ! I'm {username}</h1>
}

export default About
