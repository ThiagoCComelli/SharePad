import axios from 'axios'

const saveData = async (data) => {
    const result = await axios.post('https://sharepadtcapi.herokuapp.com/saveData', data)
    return result
}

const getData = async (room) => {
    const result = await axios.get('https://sharepadtcapi.herokuapp.com/getData', {headers:{room:room}})
    return result
}

export {saveData,getData}