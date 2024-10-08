/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_TOKENS_KEY, HOME_PAGE, LOGIN_PAGE } from '../config/Constant';
import HttpStatus from '../config/HttpStatus';

const AUTHENTICATION_API = 'http://localhost:8090/api/users/authenticate'
const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    const navigator = useNavigate()

    let [authTokens, setAuthTokens] = useState(
        ()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem(AUTH_TOKENS_KEY)) : null
    )

    let [user, setUser] = useState(
        ()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem(AUTH_TOKENS_KEY)) : null
    )

    let [loading, setLoading] = useState(true)

    

    let loginUser = async (e, username, password)=> {
        e.preventDefault()

        const authenticationRequest = {
            // username: e.target.username.value,
            // password: e.target.password.value
            username: username,
            password: password
        }

        const response = await axios.post(AUTHENTICATION_API, authenticationRequest)
        
        if(response.status === 200){
            if (response.data.httpStatus !== HttpStatus.OK) throw (response.data.message)
            setAuthTokens(response.data.object)
            //setUser(jwtDecode(response.data.object.access_token))

            localStorage.setItem('authTokens', JSON.stringify(response.data.object))
            navigator(HOME_PAGE)
        }
        else {
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem(AUTH_TOKENS_KEY)
        navigator(LOGIN_PAGE)
        window.location.reload();
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }


    useEffect(()=> {

        if(authTokens){
            setUser(jwtDecode(authTokens.access_token))
        }
        setLoading(false)


    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
