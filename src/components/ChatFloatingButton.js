import React from 'react';
import './ChatFloatingButton.css'
import ChatWindow from './ChatWindow';
import SubmitForm from './SubmitForm';
export default class ChatFloatingButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showChatButton:true,showChatWindow: false,showSubmitForm:false};
    this.openChatWindow = this.openChatWindow.bind(this)
    this.hideChatWindow = this.hideChatWindow.bind(this)
    this.succSubmit = this.succSubmit.bind(this)   
  }
  componentWillMount() {
    //localStorage.removeItem('registrationInfo')
  }
  openChatWindow() {
    if(localStorage.getItem('registrationInfo')){
      this.setState({ showChatButton:false,showChatWindow: true,showSubmitForm:false})
    }else{
      this.setState({ showChatButton:false,showChatWindow: false,showSubmitForm:true})
    }
  }

  hideChatWindow() {
    this.setState({ showChatButton:true,showChatWindow: false,showSubmitForm:false})
  }

  succSubmit() {
    if(localStorage.getItem('registrationInfo')){
      this.setState({ showChatButton:false,showChatWindow: true,showSubmitForm:false})
    }else{
      this.setState({ showChatButton:true,showChatWindow: false,showSubmitForm:false})
    }
  }
  render() {
    return (
      <div className={!this.state.showChatButton?'floating-chat enter expand':'floating-chat enter'}>
        {this.state.showChatButton && <button onClick={this.openChatWindow} ><i className="fa fa-comments"></i></button>}
        {this.state.showSubmitForm && <SubmitForm succSubmit={this.succSubmit} hideSubmitForm={this.hideChatWindow}/>}
        {this.state.showChatWindow && <ChatWindow hideChatWindow={this.hideChatWindow}/>}
      </div>
    );
  }
}