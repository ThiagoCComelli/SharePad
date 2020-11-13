import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserContext from './context/UserContext'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import Login from './components/pages/Login'
import Pad from './components/pages/Pad'

import './App.css'

function App() {
  const [userData, setUserData] = useState({name:undefined,room:undefined,socket:undefined})

  return (
    <>
    <Router>
      <UserContext.Provider value={{userData,setUserData}}>
      <ReactNotification />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/pad" exact component={Pad} />
        </Switch>
      </UserContext.Provider>
    </Router>
    </>
  );
}

export default App;