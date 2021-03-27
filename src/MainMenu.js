import React from "react";

class MainMenu extends React.Component {



  state = {
    hostname: "",
  }

  userid = ""

  constructor() {
    super()
    this.getUserID()
  }

  getUserID = () => {
    fetch(process.env.REACT_APP_AUTH_LINK, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ hash: localStorage.getItem("hash") })
    }).then(e => e.json().then(e => {
      this.userid = e.userid
    })).catch(() =>{
      alert("Wir konnten dich nicht einloggen")
      localStorage.clear()
      window.location.reload()

    })
  }


  connectWS = () => {
    let con = new WebSocket(process.env.REACT_APP_SOCKET_LINK)
    con.onopen = () => {
      con.send(JSON.stringify({ type: "register", value: this.userid, hostname: this.state.hostname }))
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
      <>
        <div>
          <h1>Device Register</h1>
          <input onChange={e => this.setState({ "hostname": e.target.value })} placeholder="Hostname" />
          <button onClick={this.connectWS}>Register</button>

        </div>

        <div>
          <button onClick={() => {
            alert("Ausgeloggt")
            localStorage.clear()
            window.location.reload()

          }}>Logout</button>
        </div>

      </>
    );
  }
}

export default MainMenu;
