import React from 'react';
import $ from 'jquery';
import ReactHtmlParser from 'react-html-parser';
import Review from './Review.jsx';
import Dropdown from './Dropdown.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overall_rating: null,
      reviews: []
    };

    this.starFill = this.starFill.bind(this);

  }

  componentDidMount() {
    console.log('inside componentDidMount');
    this.getReviews((err, reviews) => {
      if (err) {
        window.alert('Error reviews not found', err);
      } else {
        console.log('inside getReviews success case');
        var overall_rating = this.countAverageRating(reviews);
        this.setState({reviews, overall_rating});
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
  countAverageRating(reviewsArr) {
    return reviewsArr.reduce((sum, review) => {
      return sum + review.overall_rating;
    }, 0) / reviewsArr.length;
  }

  starFill(avg) {
    var str = '';
    if(avg <= 5 && avg > 4) {
      str = '<div id="average_star_5"></div>';
    } else if (avg <= 4 && avg > 3) {
        str = '<div id="average_star_4"></div>';
    } else if (avg <= 3 && avg > 2) {
      str = '<div id="average_star_3"></div>';
    } else if (avg <= 2 && avg > 1) {
      str = '<div id="average_star_2"></div>';
    } else {
      str = '<div id="average_star_1"></div>';
    }
    return <div>{ReactHtmlParser(str)}</div>;
  }

  render () {
    var buttons = [
      {name: 'RATING', options: ['1 STAR', '2 STARS', '3 STARS', '4 STARS', '5 STARS']},
      {name: 'FIT', options: ['SECOND SKIN', 'TIGHT', 'SNUG', 'JUST RIGHT', 'ROOMY', 'OVERSIZED', 'FLOWY']},
      {name: 'ATHLETIC TYPE', options: ['YOGI', 'RUNNER', 'DANCER', 'CYCLIST', 'SWEATY GENERALIST']},
      {name: 'AGE', options: ['18-24', '25-34', '35-44', '45-54', '55-65', 'OVER 65', 'I KEEP MY AGE ON THE D.L.']},
      {name: 'BODY TYPE', options: ['ATHLETIC', 'CURVY', 'LEAN', 'MUSCULAR', 'PETITE', 'SLIM', 'SOLID']},
      {name: 'CHOOSE A SORT ORDER', options: ['FEATURED REVIEWS FIRST', 'DATE - NEWEST FIRST', 'RATING - HIGH TO LOW', 'RATING - LOW TO HIGH']}
    ];
    var reviews = this.state.reviews;
    return (
      <div>

        <div className="summary_container">
          <h4 >REVIEWS</h4>

          <p>How's this gear working for you?</p>
          <p className="gold extra">{this.starFill(this.state.overall_rating)}</p>
          <button className="button gold"> CREATE A REVIEW </button>
        </div>

        <div className="filter_row">
          {buttons.map(button => <Dropdown button={button}/>)}
        </div>

        <div className="reviews_container">
          {reviews.map(obj => < Review starFill={this.starFill} nameOfProps={obj} />)}
        </div>

      </div>
    );
  }

}

export default Reviews;
