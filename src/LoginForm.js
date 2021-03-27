import { React, useState } from 'react'

export default function LoginForm(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    let login = () => {

        fetch("http://localhost:8081/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ username, password })
        }).then(response => {

            if (!response.ok) {
                setError(true)
                return
            }

            response.json().then(e => {
                if (e.userid === undefined) {
                    setError(true)
                    return
                }
                localStorage.setItem("userid", e.userid)
                props.logInState(true)

            })
        }).catch(e => {
            setError(true)
        })

    }
    return (
        <div>
            {(error) ? <h1>Es ist ein Fehler aufgetreten!</h1> : ""}
            <h1>Einloggen</h1>
            <input placeholder="Benutzername" onChange={e => setUsername(e.target.value)}></input> <br></br>
            <input placeholder="Password" onChange={e => setPassword(e.target.value)} type="password"></input><br></br>
            <button onClick={login}>Einloggen</button>
        </div>
    )
}
