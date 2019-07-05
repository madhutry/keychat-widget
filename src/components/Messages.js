import React from 'react';
import './Messages.css'
export default class Messages extends React.Component {
  constructor(props) {
    super(props)    
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
    }  
  } 
  render(){
    return(
      <ul class="messages" ref='chatoutput'>
            <ListMessages offlinemesg={this.props.offlinemesg} messages={this.props.messages} userId={this.props.userId}/>
            <ListMessages messages={this.props.typesMessages} userId={this.props.userId}/>
      </ul>
    )
  }
}

export class ListMessages extends React.Component {
  constructor(props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)  
    this.state = {
      showDetails: false,
    }
    this.showImageDetailsFunc = this.showImageDetailsFunc.bind(this)
    this.closeImageDetailsFunc = this.closeImageDetailsFunc.bind(this)

  }
  showImageDetailsFunc(url) {
    this.setState({showDetails:true,urlLoc:url})
    window.parent.postMessage(JSON.stringify({showDetails:true,urlLoc:url}),"*");
  }
  closeImageDetailsFunc() {
    this.setState({showDetails:false})
  }
  formatDate(ms) {
    if(ms==='now')
      return 'now'
    var date = new Date(Math.round(ms))
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() +'/'+date.getMonth()  + " " + strTime;
  }
  render() {
    var self=this
    const list = this.props.messages ? this.props.messages.map((messages,indx) => (
      this.props.userId===messages[2] ?
      <li className="self">{messages[0]}</li>
      :<li className="other" style={messages[4]==='m.text'?{}:{'background-color': 'transparent'}}>
        {messages[4]=='m.image' && 
          <img src={messages[5]} className="responsiveChatImg" onClick={() => this.showImageDetailsFunc(messages[5])} />
        }
        {messages[4]=='m.text' && 
        <div className="message other-message float-right">
          {messages[0]}
        </div>
        }
        {messages[4]=='m.file' && 
        <div className="message other-message float-right" style={{'font-size': '20px','color': 'white'}}>
          <a href={messages[5]} ><i class="fa fa-download" aria-hidden="true"></i>{messages[0]}</a>
        </div>
        }
       </li>
     )):<li className="clearfix">
            Loading..
        </li>
    const newlist = this.props.offlinemesg? [list,<li className="other">I am Offline. Drop me a message.</li>]:[list]
    return (
        [newlist]
      )

  }
}

export class ShowImageDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  closeModal= () =>{
    this.props.closeModal()
  }
  render() {
    return (
      <div id="id01" className="w3-modal" style={{'display':'block'}}>
        <div className="w3-modal-content">
            <div className="w3-content w3-display-container">
              <div className="w3-button w3-display-topright" onClick={this.closeModal}>&times;</div>
              <img className="mySlides w3-round" src={this.props.url} style={{'width':'100%'}}/>
            </div>
        </div>
      </div>
    )
  }
}