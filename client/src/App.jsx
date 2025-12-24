import { useState } from "react";
import "./index.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (<div>
    
   <div className="App">
    
      {!showChat ? (
        <div className="joinChatContainer">
          <div>

          <img className="logo" src="./assets/reaidylogo.png" alt="logo" />
          <h5 style = {{marginTop: "5px", fontWeight: "bold"}}>Chat Application </h5>
          </div>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room Name/ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && joinRoom();
            }}
          />
          <button className="btn btn-primary" onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  </div>
   
  );
}

export default App;
