import React,{useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import {saveData,getData} from '../../utils/DB'
import {notification} from '../../utils/middlewareNotifications'

import '../styles/Pad.css'

export default function Pad(){
    const {userData} = useContext(UserContext)
    const [text,changeText] = useState('')
    const [count,changeCount] = useState(0)
    const history = useHistory()

    useEffect(() => {
        if(userData.socket !== undefined){
            userData.socket.on('message', (e) => {
                changeText(e)
            })

            userData.socket.on('sendInfos', (e) => {
                changeCount(e.roomUsers)
            })

            userData.socket.emit('joinRoom', userData.room)
        }

        // eslint-disable-next-line
    },[])

    // useEffect(() => {
    //     var time = 0

    //     if(userData.room !== undefined){
    //         // eslint-disable-next-line
    //         const timer = setInterval(() => {
    //             time >= 60 ? callSaveText() : time++
    //         }, 1000)
    //     }

    //     const callSaveText = () => {
    //         time = 0
    //         saveText()
    //     }

    //     // eslint-disable-next-line
    // },[])

    const saveText = async () => {
        const res = await saveData({room:userData.room,content:text})

        if(res.data){
            notification({title:"File saved!",message:"Content saved in database",type:"success"})
        }
    } 

    useEffect(() => {
        const getDataFromDB = async () => {
            const res = await getData(userData.room)

            if(res.data[0] !== undefined){
                changeText(res.data[0].content)
            }
        }
        getDataFromDB()
        // eslint-disable-next-line
    },[])

    const emitToAll = (e) => {
        userData.socket.emit('sendMessage',{text:e,room:userData.room})
    }

    if(userData.room === undefined){
        history.push('/')
    }

    return(
        <>
            <div className="mainPad">
                <div className="infosPad boxPad">
                    <h1>SharePad</h1>
                    <span>by: Thiago Comelli</span>
                </div>
                <div className="textPad boxPad">
                    <textarea onChange={(e) => {
                        changeText(e.target.value)
                        emitToAll(e.target.value)
                        }} value={text} spellCheck='false' className="textPadInput">
                    </textarea>
                    <button onClick={saveText} className="btnSave">Save</button>
                </div>
                <span>Room: {userData.room} || Users in this room: {count}</span>
            </div>
        </>
    )
}