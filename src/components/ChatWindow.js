import React from 'react';
import './ChatWindow.css'
import Messages from './Messages';
import Footer from './Footer';
export default class ChatWindow extends React.Component {
  constructor(props) {
    super(props)    
    this.state = {         agentOnline:'offline',    showChatRegForm: 'false',message:'',messages:[],typesMessages:[],recvdMessage:[] };  
    this.hideChatWindow = this.hideChatWindow.bind(this)

    this.sendMessage = this.sendMessage.bind(this)  
    this.checkAgentOnline = this.checkAgentOnline.bind(this)
    this.pingMessage = this.pingMessage.bind(this)  

    const avatarUrl = JSON.parse(localStorage.getItem('registrationInfo')).avatarUrl
    const welcomeMsg = JSON.parse(localStorage.getItem('registrationInfo')).WelcomeMessage
  }
  hideChatWindow() {
    this.props.hideChatWindow()
  }
  waitForSocketConnection(socket, callback){
    var self=this
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null){
                    callback();
                }
            } else {
                self.waitForSocketConnection(socket, callback);
            }

        }, 5); // wait 5 milisecond for the connection...
  }
  componentWillMount() {
    const token = JSON.parse(localStorage.getItem('registrationInfo')).token
    const avatarUrl = JSON.parse(localStorage.getItem('registrationInfo')).avatarUrl
    const welcomeMsg = JSON.parse(localStorage.getItem('registrationInfo')).WelcomeMessage
    this.setState({
      avatarUrl:avatarUrl,
      welcomeMsg:welcomeMsg,
      sinceMesgNo:0
    });
    var self=this
    /* axios.get('/chat/messages',{
      headers: { Authorization: "Bearer " + token }
    })
    .then(function (response) {
      self.setState({
        messages: response.data.messages,
        userId : response.data.userId
      })
    })
    .catch(function (error) {
      console.log(error);
    }); */
    document.cookie = 'X-Authorization=Bearer' + token + '; path=/';
    console.log(process.env.REACT_APP_WS_SOCKET_URL)
    this.ws = new WebSocket(process.env.REACT_APP_WS_SOCKET_URL);

    this.ws.addEventListener('message', e => {
      let msg = JSON.parse(e.data);
      let msgType = msg.msgType
      if (msgType ==='checkOnline'){
        if(this.state.agentOnline!==msg.online){
          self.setState({
            "agentOnline":(msg.online==='online')?'online':'offline',
            "agentName":(msg.online==='online')?msg.displayName:'offline',
          })
        }
      }else{
        //this.state.messages.push(JSON.parse(e.data).messages)
        if(JSON.parse(e.data).messages){
          JSON.parse(e.data).messages.map((messages,indx)=>{
            if(self.state.recvdMessage.length==0 || !self.state.recvdMessage.includes(messages[3])){
              
              self.state.messages.push([messages[0],messages[1],messages[2],messages[3],messages[4],messages[5]])
              self.state.recvdMessage.push(messages[3])
              self.setState({
                userId: JSON.parse(e.data).userId,
                typesMessages:[],
                sinceMesgNo:JSON.parse(e.data).lastSerialId
              });
            }
          });
          
        }
      }
    })
    self=this
    this.waitForSocketConnection(this.ws, function(){
      self.checkAgentOnline();
      setInterval(self.pingMessage,5000)
      setInterval(self.checkAgentOnline,20000)
    });
    
  }
  sendMessage(mesg) {
    const token = JSON.parse(localStorage.getItem('registrationInfo')).token
    var uuid = this.simpleUniqueId('mesg')
    this.state.typesMessages.push([mesg,'now',this.state.userId,uuid])
    this.setState({typesMessages:this.state.typesMessages})
    var msg = JSON.stringify({'mesgType':'sendmesg','message':mesg,'token':token,'uuid':uuid})
    this.ws.send(msg)
  }
  checkAgentOnline(){
    const token = JSON.parse(localStorage.getItem('registrationInfo')).token
    var msg = JSON.stringify({'mesgType':'checkagentonline','token':token})
    this.ws.send(msg)
  }
  pingMessage() {
    const token = JSON.parse(localStorage.getItem('registrationInfo')).token
    var uuid = this.simpleUniqueId('mesg')
    var msg = JSON.stringify({'mesgType':'ping','token':token,'lastSerialNo':this.state.sinceMesgNo})
    this.ws.send(msg)
  }
  gen4() {
    return Math.random().toString(16).slice(-4)
  }
  
  simpleUniqueId(prefix) {
    var self=this
    return (prefix || '').concat([
      self.gen4(),
      self.gen4(),
      self.gen4(),
      self.gen4(),
      self.gen4(),
      self.gen4(),
      self.gen4(),
      self.gen4()
    ].join(''))
  }
  formatDate(ms) {
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
    return (
      <div className="chat enter">
        <div className="header">
          {this.state.agentOnline==='online' && <span className="title">
              Connected to {this.state.welcomeMsg}</span>
          }
          {this.state.agentOnline==='offline' &&
            <span className="title">{this.state.welcomeMsg}-is offline
            </span>
          }
          <button onClick={this.hideChatWindow} ><i className="fa fa-times"></i></button>
        </div>
        <Messages offlinemesg={this.state.agentOnline==='offline'} messages={this.state.messages} typesMessages={this.state.typesMessages} userId={this.state.userId}/>
        <Footer sendMessage={this.sendMessage}/>
      </div>
    )
  }
}
