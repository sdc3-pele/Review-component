import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import Review from './Review.jsx';
import Dropdown from './Dropdown.jsx';


const MainContainer = styled.div`
  color: #666666;
  padding: 50px;
  font-family: Calibre,'Helvetica Neue','Helvetica','Roboto','Arial',sans-serif;
  font-size: 10px;
`;
const SummaryContainer = styled.div`
  padding: 10px;
  text-align: center;
  color: #fff;
  width: auto;
  color: #666666;
  font-weight: 300;
  line-height: 1.5;
`;
const FilterRow = styled.div`
  display:flex;
  flex-direction: row;
  padding: 10px;
  overflow: hidden;
  background-color: #F6F6F6;
  padding: 20px 20px 20px 40px;
`;
const ReviewsContainer = styled.div`
  padding: 10px;
`;
const Heading = styled.h3`
  text-lign: center;
  border-bottom:1px red solid;
`;
const QforReview = styled.p`
  font-size: 18px;
  letter-spacing: 0.02em;
  font-style: bold;
  font-weight: 300;
`;
const StarsOverall = styled.div`
  margin-left: 50px;
  color: #938454;
`;
const CreateReviewButton = styled.button`
  color: #938454;
  background-color: #F6F6F6;
  border: 1px solid #938454;
  padding: 8px 13px;
  margin-bottom: 30px;
  font-size: 11px;
  font-style: bold;
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1.2;

  :hover{
    background-color: #938454;
    color: white;
  }
`;
const Average_star_1 = styled.div`
  height: 20px;
  width: 150px;
  display: inline-block;
  background-image: url("https://s3-us-west-1.amazonaws.com/fec.reviews.stars/rating_1.gif");
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: 100px;
`;
const Average_star_2 = styled.div`
  height: 20px;
  width: 150px;
  display: inline-block;
  background-image: url("https://s3-us-west-1.amazonaws.com/fec.reviews.stars/rating_2.gif");
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: 100px;
`;
const Average_star_3 = styled.div`
  height: 20px;
  width: 150px;
  display: inline-block;
  background-image: url("https://s3-us-west-1.amazonaws.com/fec.reviews.stars/rating_3.gif");
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: 100px;
`;
const Average_star_4 = styled.div`
  height: 20px;
  width: 150px;
  display: inline-block;
  background-image: url("https://s3-us-west-1.amazonaws.com/fec.reviews.stars/rating_4.gif");
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: 100px;
`;
const Average_star_5 = styled.div`
  height: 20px;
  width: 150px;
  display: inline-block;
  background-image: url("https://s3-us-west-1.amazonaws.com/fec.reviews.stars/rating_5.gif");
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: 100px;
`;

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
    this.getReviews((err, reviews) => {
      if (err) {
        console.log('Error reviews not found', err);
      } else {
        var overall_rating = this.countAverageRating(reviews);
        this.setState({reviews, overall_rating});
      }
    });
  }

  getReviews(cb) {
    const id = window.location.pathname.split('/')[1];
    $.ajax({
      url: `/api/reviews/${id}`,
      success: function(reviews) {
        reviews = JSON.parse(reviews);
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
    if(avg <= 5 && avg > 4) {
      return <Average_star_5></Average_star_5>;
    } else if (avg <= 4 && avg > 3) {
      return <Average_star_4></Average_star_4>;
    } else if (avg <= 3 && avg > 2) {
      return <Average_star_3></Average_star_3>;
    } else if (avg <= 2 && avg > 1) {
      return <Average_star_2></Average_star_2>;
    } else {
      return <Average_star_1></Average_star_1>;
    }
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

      <MainContainer>
        <SummaryContainer>
        <Heading>REVIEWS</Heading>
        <QforReview>How's this gear working for you?</QforReview>
        <StarsOverall>{this.starFill(this.state.overall_rating)}</StarsOverall>
        <CreateReviewButton> CREATE A REVIEW </CreateReviewButton>
        </SummaryContainer>

        <FilterRow>
          {
            buttons.map((button,i) => {
              return <Dropdown key={i.toString()} button={button}/>
            })
          }
        </FilterRow>

         <ReviewsContainer>
          {
            reviews.map((obj, i) => {
              return <Review starFill={this.starFill} review={obj} key={i.toString()}/>
            })
          }
         </ReviewsContainer>

      </MainContainer>

    );
  }

}

export default Reviews;
