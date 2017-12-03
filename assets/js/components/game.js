// attributes to Nat Tuck's lecture notes and the Hangman repo
import React from "react";
import Grid from "./grid"

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  // attribute to the phoenix chat example repo
  sanitize(html){ return $("<div/>").text(html).html(); }

  messageTemplate(msg){
    let username = this.sanitize(msg.user || "anonymous")
    let body     = this.sanitize(msg.body)

    return(`<p><a href='#'>[${username}]</a>&nbsp; ${body}</p>`);
  }

  handleKeyPress(event) {
    if(event.key == 'Enter') {
      console.log("enter is pressed");
      var msg = $("#message-field").val();
      this.props.channel.push("new:msg", {user: window.user_name, body: msg}).
      receive("ok", state => this.setState(state));
    }

    this.props.channel.on("new:msg", msg => {
      let chatContainer = $("#chats")
      chatContainer.prepend(this.messageTemplate(msg))
    })
    return false;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <p>Chat: </p>
            <input id="message-field" type="text" onKeyPress={(e) => this.handleKeyPress(e)} />
          </div>
        </div>
        <div className="row" >
          <div className="col-md-4" id="chats">
          </div>
        </div>
        <div className="row" >
          <div className="col-sm-6">
            <p> Your Board: </p>
            <Grid game={this.state}/>
          </div>
          <div className="col-sm-6">
            <p> Opponent Board: </p>
            <Grid game={this.state}/>
          </div>
        </div>
      </div>
    );
  }
};
