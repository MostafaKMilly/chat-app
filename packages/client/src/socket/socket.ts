import io from "socket.io-client";

export default io("https://localhost:8000", {
  autoConnect: false,
});
