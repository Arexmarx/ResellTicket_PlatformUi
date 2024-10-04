/* eslint-disable react/prop-types */
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import UnAuthorizedPage from '../pages/UnAuthorizedPage'

const PrivateRoute = ({ children }) => {
    let { user } = useContext(AuthContext)
    return !user ? <UnAuthorizedPage/> : children
}

export default PrivateRoute;