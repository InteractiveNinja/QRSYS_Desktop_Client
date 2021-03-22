import React from "react";

class App extends React.Component {
  state = {
    userid: "",
    hostname: ""
  };

  setUserID = event => {
    this.setState({ userid: event.target.value });
  };
  setHostName = event => {
    this.setState({ hostname: event.target.value });
  };

  connectWS = () => {
    let con = new WebSocket("ws://192.168.1.117:8080")
    con.onopen = () =>{
        con.send(JSON.stringify({type:"register",value:this.state.userid,hostname:this.state.hostname}))
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
        <input onChange={this.setUserID} placeholder="User ID" />
        <input onChange={this.setHostName} placeholder="Hostname" />
        <button onClick={this.connectWS}>Register</button>
      </div>
    );
  }
}

export default App;
