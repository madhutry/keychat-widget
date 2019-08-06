import React from 'react';
import './Rating.css';

export default class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: this.props.resp?this.props.resp.rating:-1,
      temp_rating: -1,
      cardInfo:'rating',
      mesgId:this.props.mesgId,
      resp:this.props.resp
    }
    this.star_out = this.star_out.bind(this)

  }
  rate(rating) {
    debugger
    this.setState({
      rating: rating,
      temp_rating: rating
    });
    this.props.cardMessage(this.state)
  }
  star_over(rating) {
    this.state.temp_rating = this.state.rating;
    this.state.rating = rating;
    
    this.setState({
      rating: this.state.rating,
      temp_rating: this.state.temp_rating
    });
  }
  star_out() {
    this.state.rating = this.state.temp_rating;
    
    this.setState({ rating: this.state.rating });
  }
  render() {
    var stars = [];
    
    for(var i = 0; i < 5; i++) {
      var klass = 'star-rating__star';
      
      if (this.state.rating >= i) {
        klass += ' is-selected';
      }
      const result = this.state.resp ? <label
          className={klass}>
          ★
        </label>
      : <label
          className={klass}
          onClick={this.rate.bind(this, i)}
          onMouseOver={this.star_over.bind(this, i)}
          onMouseOut={this.star_out}>
          ★
        </label>

      stars.push(
        result
      );
    }
    
    return (
      <div className="star-rating">
        <fieldset>
        <legend>Ratings:</legend>
        {stars}
        </fieldset>
      </div>
    );
  }
};
