import {React,useState} from 'react'
import LoginForm from './LoginForm'
import MainMenu from './MainMenu'

export default function App() {

  const [LoggedIn, setLoggedIn] = useState(false)

  return (
    <div>
      {(!localStorage.getItem("userid")) ? (!LoggedIn)? <LoginForm logInState={setLoggedIn}></LoginForm> : <MainMenu></MainMenu> : <MainMenu></MainMenu>}
      
    </div>
  )
}
