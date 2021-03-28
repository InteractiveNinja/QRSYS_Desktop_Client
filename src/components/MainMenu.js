import React from "react";
class MainMenu extends React.Component {







  constructor() {
    super()
    this.checkHashAndGetUserID()



    this.state = {
      hostname: "",
      userid: ""
    }
  }

  /**
   * Prüft ob der Hash Valide ist und versucht mit diesem dier UserID zu erhalten
   */
  checkHashAndGetUserID = () => {
    fetch(process.env.REACT_APP_AUTH_LINK, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ hash: localStorage.getItem("hash") })
    }).then(e => e.json().then(e => {
      this.setState({ userid: e.userid })
    })).catch(() => {
      alert("Wir konnten dich nicht einloggen")
      localStorage.clear()
      window.location.reload()

    })
  }


  /**
   * Baut eine Verbindung mit dem Web Socket auf
   */
  connectWS = () => {
    let con = new WebSocket(process.env.REACT_APP_SOCKET_LINK)
    con.onopen = () => {
      con.send(JSON.stringify({ type: "register", value: this.state.userid, hostname: this.state.hostname }))
    }
    con.onmessage = (msg) => {
      let json = JSON.parse(msg.data)
      console.log(json)
      switch (json.type) {
        case "callback":
          if (json.value === 200) alert("Erfolgreich")
          if (json.value === 500) alert("Fehlgeschlagen")
          break;
        case "show":
          alert(json.value)
          break;
        default:
          con.close()
          break;
      }

    }
  };

  render() {

    return (
      <div>
        <h1>Device Register</h1>
        <input onChange={e => this.setState({ hostname: e.target.value })} placeholder="Hostname" />
        <button onClick={this.connectWS}>Register</button>
        <button onClick={() => {
          alert("Ausgeloggt")
          localStorage.clear()
          window.location.reload()

        }}>Logout</button>
      </div>

    );
  }
}

export default MainMenu;
