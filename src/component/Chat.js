import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
  socket = null; //place, where we store the connection

  state = {
    message: "",
    messages: [], //messages which has been received
    user: null,
  };

  componentDidMount() {
    const connOpt = { transports: ["websocket"] }; //connection options
    this.socket = io("https://striveschool-api.herokuapp.com", connOpt);
    this.socket.on("setUsername", (msg) =>
      this.setState({ message: this.state.message.concat(msg) })
    ); //receiving messages
  }

  handleMessage = (e) => {
    this.setState({
      message: e.currentTarget.value, // reference to onChange. Value which has been added to change
    });
  };

  sendMessage = (e) => {
    e.preventDefault(); //avoids page to refresh. not to loose temorrary data
    if (this.state.message !== "") {
      this.socket.emit("setUsername", {
        //sending the message
        user: this.state.user,
        message: this.state.message,
      });
      this.state({ message: "" });
    }
  };

  render() {
    return (
      <>
        <ul id="messages">
          <li> message</li>
          <form id="chat" onSubmit={this.sendMessage}>
            <input
              autoComplete="off"
              value={this.state.message} //value which comes from state
              onChange={this.handleMessage} //value which is changing
            />
            <button type="submit">Send</button>
          </form>
        </ul>
      </>
    );
  }
}
export default Chat;
