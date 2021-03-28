import {React} from 'react'
import LoginForm from './components/LoginForm'
import MainMenu from './components/MainMenu'

export default function App() {


  return (
    <div>
      {(!localStorage.getItem("hash") )? <LoginForm></LoginForm> :  <MainMenu></MainMenu>}
      
    </div>
  )
}
