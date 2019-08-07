import React from 'react';

export default class AptConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: 1,
      deal: 'sell',
      cardInfo:'aptconfig',
      mesgId:this.props.mesgId,
      resp:this.props.resp
    }
    this.cardMessage = this.cardMessage.bind(this)
    this.setRoomConfig = this.setRoomConfig.bind(this)
    this.setDeal = this.setDeal.bind(this)

  }
  setRoomConfig(e) {
    this.setState({
      rooms: e.target.value
    })
  }
  setDeal(e) {
    this.setState({
      deal: e.target.value
    })
  }  
  cardMessage(event) {
    event.preventDefault();
    this.props.cardMessage(this.state)
    this.setState({
      submitted:'Y'
    })
  }
  render() {
    const result = this.state.resp ? 
    <div>
      <fieldset>
      <legend>Apt Configuration :</legend>
      Room Configuration:<br/>
        <input type="radio" checked={this.state.resp.rooms==1}/> 1 BHK
        <input type="radio" checked={this.state.resp.rooms==2}/> 2 BHK
        <input type="radio" checked={this.state.resp.rooms==0}/> Other
        <br/><br/>
      Buy/Sell:<br/>
      <input type="radio" checked={this.state.resp.deal=='buy'}/> Buy
      <input type="radio" checked={this.state.resp.deal=='sell'}/> Sell
      <br/>
      <div style={{'text-align': 'center'}}>
        <span style={{'font-size': '48px', 'color': 'green'}}>
          <i class="fa fa-check"></i>
        </span>
      </div>
      </fieldset>
    </div> 
    :
    <div>
    <fieldset>
      <legend>Apt Configuration :</legend>
      Room Configuration:<br/>
        <input type="radio" name="rooms" onClick={this.setRoomConfig} value="1"/> 1 BHK
        <input type="radio" name="rooms" onClick={this.setRoomConfig} value="2"/> 2 BHK
        <input type="radio" name="rooms" onClick={this.setRoomConfig} value="0"/> Other
        <br/><br/>
      Buy/Sell:<br/>
      <input type="radio" name="deal" onClick={this.setDeal} value="buy"/> Buy
      <input type="radio" name="deal" onClick={this.setDeal} value="sell"/> Sell
      <br/>
      <div style={{'text-align': 'center'}}>
        {!this.state.submitted && <button id="cardMessage12" onClick={this.cardMessage} style={{'background-color': '#00ff'}}>Submit</button>}
        {this.state.submitted=='Y' && <span style={{'font-size': '48px', 'color': 'green'}}>
          <i class="fa fa-check"></i>
        </span>}
      </div>
    </fieldset>
    </div>
    return (
      result
    );
  }
};
