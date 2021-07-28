import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import About from './views/About'
import ProtectedRoute from './components/routing/ProtectedRoute'
import PostContextProvider from './contexts/PostContext'

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Landing}></Route>
                        <Route
                            exact
                            path="/login"
                            render={(props) => (
                                <Auth {...props} authRoute="login"></Auth>
                            )}
                        ></Route>
                        <Route
                            exact
                            path="/register"
                            render={(props) => (
                                <Auth {...props} authRoute="register"></Auth>
                            )}
                        ></Route>
                        <ProtectedRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        ></ProtectedRoute>
                        <ProtectedRoute
                            exact
                            path="/about"
                            component={About}
                        ></ProtectedRoute>
                    </Switch>
                </Router>
            </PostContextProvider>
        </AuthContextProvider>
    )
}

export default App
