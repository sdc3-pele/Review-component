import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: []
    };
    this.get = this.getReviews.bind(this);
  }

  componentDidMount() {
    console.log('yes');
    this.getReviews((err, reviews) => {
      if (err) {
        window.alert('Error reviews not found', err);
      } else {
        this.setState({ reviews });
      }
    });
  }

  getReviews(cb) {
    const id = window.location.pathname.split('/')[2];
    $.ajax({
      url: `/api/listings/${id}/reviews`,
      success: function(reviews) {
        cb(null, reviews);
      },
      error: function(err) {
        cb(err);
      }
    });
  }

  render () {
    return (
      <div>
        {this.state.reviews}
      </div>
    );
  }
}

ReactDOM.render(<Reviews />, document.getElementById('reviews'));