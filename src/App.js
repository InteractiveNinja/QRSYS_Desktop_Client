import React from "react";

class App extends React.Component {
  state = {
    userid: ""
  };

  handleInput = event => {
    this.setState({ userid: event.target.value });
  };

  connectWS = () => {
    let con = new WebSocket("ws://localhost:8080")
    con.onopen = () =>{
        con.send(`{"type":"register","value":"${this.state.userid}"}`)
    }
    con.onmessage = (msg) =>{
        let json = JSON.parse(msg.data)
        switch (json.type) {
            case "callback":
                if(json.value === "200") alert("Regestrierung Erfolgreich")
                if(json.value === "500") alert("Fehlgeschlagen")
                break;
            case "show":
                alert(json.value)
                break;
            default:
                alert("idk irgendwas bekommen")
                break;
        }
       
    }
  };

  render() {
    return (
      <div>
          <h1>Device Register</h1>
        <input onChange={this.handleInput} placeholder="User ID" />
        <button onClick={this.connectWS}>Register</button>
      </div>
    );
  }
}

export default App;
