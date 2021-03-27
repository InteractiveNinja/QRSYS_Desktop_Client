import React from "react";

class MainMenu extends React.Component {
  
 
  state = {
    hostname: ""
  }

  connectWS = () => {
    let con = new WebSocket("ws://localhost:8080")
    con.onopen = () =>{
        con.send(JSON.stringify({type:"register",value:localStorage.getItem("userid"),hostname:this.state.hostname}))
    }
    con.onmessage = (msg) =>{
        let json = JSON.parse(msg.data)
        console.log(json)
        switch (json.type) {
            case "callback":
                if(json.value === 200) alert("Regestrierung Erfolgreich")
                if(json.value === 500) alert("Fehlgeschlagen")
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
        <input onChange={e => this.setState({"hostname":e.target.value})} placeholder="Hostname" />
        <button onClick={this.connectWS}>Register</button>
      </div>
    );
  }
}

export default MainMenu;
