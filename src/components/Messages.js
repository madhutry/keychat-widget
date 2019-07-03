import React from 'react';
import './Messages.css'
export default class Messages extends React.Component {
  constructor(props) {
    super(props)    
  }
  render(){
    return(
      <ul class="messages">
            <li class="other">asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas</li>
            <li class="other">Are we dogs???</li>
            <li class="self">no... we're human</li>
            <li class="other">are you sure???</li>
            <li class="self">yes.... -___-</li>
            <li class="other">if we're not dogs.... we might be monkeys</li>
            <li class="self">i hate you</li>
            <li class="other">don't be so negative! here's a banana</li>
            <li class="self">......... -___-</li>
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
      <li>
        <div class="message-data">
          <span class="message-data-name"><i class="fa fa-circle online"></i> Me</span>
          <span class="message-data-time">{self.formatDate(messages[1])}</span>
        </div>
        <div class="message my-message">
        {messages[0]}
        </div>
      </li> :
      <li className="clearfix">
        <div className="message-data align-right">
          <span className="message-data-time">{self.formatDate(messages[1])}</span> &nbsp; &nbsp;
          <span className="message-data-name">{messages[2]}</span> <i className="fa fa-circle me"></i>
        </div>
        {messages[4]=='m.image' && 
          <img src={messages[5]} className="responsiveChatImg" onClick={() => this.showImageDetailsFunc(messages[5])} />
        }
        {messages[4]=='m.text' && 
        <div className="message other-message float-right">
          {messages[0]}
        </div>
        }
        {messages[4]=='m.file' && 
        <div className="message other-message float-right" style={{'max-width':'500px'}}>
          <a href={messages[5]} ><i class="fa fa-download" aria-hidden="true"></i>{messages[0]}</a>
        </div>
        }
      </li>
     )):<li className="clearfix">
          <div className="message-data align-right">
            <span className="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
            <span className="message-data-name">Olia</span> <i className="fa fa-circle me"></i>
          </div>
          <div className="message other-message float-right">
            Loading..
          </div>
        </li>
    return (
      <div> 
        { self.state.showDetails && <ShowImageDetails closeModal={this.closeImageDetailsFunc} url={this.state.urlLoc} />}
        { !self.state.showDetails && list}
      </div>
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
