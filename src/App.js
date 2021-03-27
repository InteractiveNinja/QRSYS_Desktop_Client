import {React} from 'react'
import LoginForm from './LoginForm'
import MainMenu from './MainMenu'

export default function App() {


  return (
    <div>
      {(!localStorage.getItem("hash") )? <LoginForm></LoginForm> :  <MainMenu></MainMenu>}
      
    </div>
  )
}
