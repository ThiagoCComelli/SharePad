import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import socketClient from 'socket.io-client'

import '../styles/Login.css'

export default function Login(){
    const {userData, setUserData} = useContext(UserContext)
    const history = useHistory() 
    
    const submit = (e) => {
        e.preventDefault()

        setUserData({...userData,socket:socketClient('https://sharepadtcapi.herokuapp.com/')})
        
        history.push('/pad')
    }

    return(
        <>
        <div className="mainLogin">
            <form onSubmit={submit} className="formLogin">
                <div className="cardLogin">
                    <div className="cardLoginTitle">
                        <h2>Login</h2>
                        <small>SharePad by: Thiago Comelli </small>
                    </div>
                    <div className="cardLoginContent">
                        <label>Name:</label>
                        <input type="text" placeholder="Write your name" onChange={(e) => {setUserData({...userData,name:e.target.value})}} required></input>
                        <label>Room:</label>
                        <input type="text" placeholder="Write your room" onChange={(e) => {setUserData({...userData,room:e.target.value})}} required></input>

                        <button type="submit">Enter</button>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}