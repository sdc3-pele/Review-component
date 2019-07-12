import React from 'react';
import $ from 'jquery';
import Review from './Review.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overall_rating: null,
      reviews: []
    };
    this.get = this.getReviews.bind(this);
  }

  componentDidMount() {
    console.log('inside componentDidMount');
    this.getReviews((err, reviews) => {
      if (err) {
        window.alert('Error reviews not found', err);
      } else {
        console.log('inside getReviews success case');
        this.setState({ reviews });
      }
    });
  }

  getReviews(cb) {
    const id = window.location.pathname.split('/')[3];
    console.log('id is equal to: ', id);
    $.ajax({
      url: `/api/listings/${id}/reviews`,
      success: function(reviews) {
        console.log('type of data: ', typeof reviews);
        reviews = JSON.parse(reviews);
        console.log('type of data: ', typeof reviews);
        console.log(reviews);
        cb(null, reviews);
      },
      error: function(err) {
        cb(err);
      }
    });
  }

  render () {
    var reviews = this.state.reviews;
    return (
      <div>
        <div id="summary_container">
          <h4 id="red_line">REVIEWS</h4>
          <p>How's this gear working for you?</p>
          <p>here I'm gonna extract overall_rating from state</p>
          <button id="button"> CREATE A REVIEW </button>
        </div>

        <div id="filter_row">****bar where reviews can be filtered*****</div>
        <div id="reviews_container">
          {reviews.map(obj => < Review nameOfProps={obj} />)}
        </div>
      </div>
    );
  }

}

{/* const Reviews = () => <h1>test</h1> */}
export default Reviews;