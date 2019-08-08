import React from 'react';
import './Messages.css'
import Rating from './Rating';
import AptConfig from './Config';
import ContactCard from './ContactCard';

export default class Messages extends React.Component {
  constructor(props) {
    super(props)    
    this.cardMessage = this.cardMessage.bind(this)
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
    }  
  }
  cardMessage(mesg) {
    this.props.cardMessage(mesg)
  }
  render(){
    return(
      <ul class="messages" ref='chatoutput'>
            <ListMessages cardMessage={this.cardMessage} offlinemesg={this.props.offlinemesg} messages={this.props.messages} userId={this.props.userId}/>
            <ListMessages cardMessage={this.cardMessage} messages={this.props.typesMessages} userId={this.props.userId}/>
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
    this.cardMessage = this.cardMessage.bind(this)
  }
  showImageDetailsFunc(url,altVal) {
    this.setState({showDetails:true,urlLoc:url})
    window.parent.postMessage(JSON.stringify({showDetails:true,urlLoc:url,alt:altVal}),"*");
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
  cardMessage(mesg) {
    this.props.cardMessage(mesg)
  }
  render() {
    var self=this
    const list = this.props.messages ? this.props.messages.map((messages,indx) => (
      this.props.userId===messages[2] ?
      <li className="self">{messages[0]}</li>
      :<li className={(messages[4]=='m.text' && !messages[0].startsWith("#") ? 'other' : 'otherntxt')} style={messages[4]==='m.text'?{}:{'background-color': 'transparent'}}>
        {messages[4]=='m.image' && 
          <img src={messages[5]} alt={messages[0]} className="responsiveChatImg" onClick={() => this.showImageDetailsFunc(messages[5],messages[0])} />
        }
        {messages[4]=='m.text' && !messages[0].startsWith("#") && 
        <div className="message other-message float-right">
          {messages[0]}
        </div>
        }
        {messages[4]=='m.text' && messages[0].startsWith("#rating") && 
        <div className="message other-message float-right">
          <Rating cardMessage={this.cardMessage}  mesgId={messages[3]} resp={messages[6]}/>
        </div>
        }
        {messages[4]=='m.text' && messages[0].startsWith("#contact") && 
        <div className="message other-message float-right">
          <ContactCard />
        </div>
        }
        {messages[4]=='m.text' && messages[0].startsWith("#aptconfig") && 
        <div className="message other-message float-right">
          <AptConfig cardMessage={this.cardMessage} mesgId={messages[3]} resp={messages[6]}/>
        </div>
        }
        {messages[4]=='m.file' && 
        <div className="message other-message float-right" style={{'font-size': '20px','color': 'white'}}>
          <a href={messages[5]} ><i class="fa fa-download" aria-hidden="true"></i><span style={{'color': '#0ec879','font-size': '15px'}}>{messages[0]}</span></a>
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