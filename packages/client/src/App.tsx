import React from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8000");

const App = () => {
  const [time, setTime] = React.useState("fetching");
  React.useEffect(() => {
    socket.on("connect", () => console.log(socket.id));
    socket.on("receive", (data) => {
      console.log(data);
    });
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("time", (data) => setTime(data));
    socket.on("disconnect", () => setTime("server disconnected"));
  }, []);
  return (
    <div className="App">
      <button
        onClick={() => {
          socket.emit("receive", "Hola");
        }}
      >
        Say Hii
      </button>
    </div>
  );
};
export default App;
