import React from 'react';
import './SubmitForm.css'
import './circular.css'
import axios from 'axios';
export default class SubmitForm extends React.Component {
  constructor(props) {
    super(props)
    this.openChat = this.openChat.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.hideSubmitForm = this.hideSubmitForm.bind(this)

    this.state = {
      fullname: '',
      mobileno: '',
      submitting:false
    }
  }
  componentDidMount(){
    var self = this
    axios.post('/chat/token',{})
    .then(function (response) {
      self.setState({
        token:response.data.token
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  hideSubmitForm() {
    this.props.hideSubmitForm()
  }
  openChat() {
    console.log('opemnChat')
    console.log(this.state.fullname)
    console.log(this.state.mobileno)
    this.setState({submitting:true})
    const req = {'token':this.state.token,'fullname':this.state.fullname,'mobileno':this.state.mobileno,'extrainfo':{something:'hi'}}
    var self=this
		axios.post('/chat/submitchat',req)
    .then(function (response) {
      localStorage.setItem('registrationInfo',JSON.stringify(response.data))
      self.props.succSubmit()
    })
    .catch(function (error) {
      console.log(error);
    });
    // var self=this
    // setTimeout(function(){
    //   self.setState({submitting:false})
    //   localStorage.setItem('formsubmitted',true)
    //   self.props.succSubmit()
    // },10000)
    //this.props.sendReceive(this.state.fullname, this.state.mobileno)
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div className="chatform enter">
        <div className="header">
          <span className="title">
            Start Chat
          </span>
          <button onClick={this.hideSubmitForm} ><i className="fa fa-times"></i></button>
        </div>
        <div className="inputform">
          <span className="inputheader">Please submit details to initiate chat.</span>
          <div className="inputs">
              <label>Full Name:</label>
              <input 
              name="fullname"
              placeholder="Please enter Full Name"
              value={this.state.fullname}
              onChange={this.handleInputChange} ></input>


              <label>Mobile No:</label>
              <input 
              name="mobileno" 
              placeholder="Please enter Mobile No"
              value={this.state.mobileno}
              onChange={this.handleInputChange} ></input>
              {!this.state.submitting && <button onClick={this.openChat}>Start Chat</button>}
              {this.state.submitting && <button >Submitting...Please Wait</button>}
            </div>
        </div>
      </div>
    )
  }
}