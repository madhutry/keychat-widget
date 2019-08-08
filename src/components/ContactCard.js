import React from 'react';
import './ContactCard.css';

export default class ContactCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }

  }
  render() {
    var stars = [];
    
    return (
      <div className="card">
          <div className="banner">
            <div className="avatar"></div>
          </div>
          <div>
            <h2>Callum Brown</h2>
            <h3>myemailid@email.com</h3>
            <h3>+91 123-456-7890</h3>
          </div>
      </div>
    );
  }
};
