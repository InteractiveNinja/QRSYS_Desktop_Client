import { React, useState } from 'react'

export default function LoginForm() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)


    /**
     * Verbindet mit den Auth Server und prüft die Login Daten, setzt einen Hash in den Localstorage wenn die Daten korrekt sind
     */
    let login = () => {

        fetch(process.env.REACT_APP_AUTH_LINK, {
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
                if (e.hash === undefined) {
                    setError(true)
                    return
                }
                localStorage.setItem("hash", e.hash)
                window.location.reload()

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
