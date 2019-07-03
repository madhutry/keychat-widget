import React from 'react';
import './Footer.css'
export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this)
    this.handleInputChange= this.handleInputChange.bind(this)
    this.state = {message:''};  

  }
  handleInputChange(event) {
    this.setState({message: event.target.value});
  }
  sendMessage() {
    this.props.sendMessage(this.state.message)
  }
  render(){
    return(
      <div className="footer">
        <textarea name="message" value={this.state.message} 
          onChange={this.handleInputChange} placeholder="Type your message" rows="1">
        </textarea>
        <button id="sendMessage" onClick={this.sendMessage} >Send</button>
      </div>
    )
  }
}