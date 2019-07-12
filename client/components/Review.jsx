import React from 'react';

const Review = (props) => {
  return(
    <div id="reviews_container">
      <div>{props.nameOfProps.overall_rating}</div>
      <div>{props.nameOfProps.nickname_login}</div>
      <div>LOCATION: {props.nameOfProps.location}</div>
      <div>ATHLETIC TYPE: {props.nameOfProps.athletic_type}</div>
      <div>AGE: {props.nameOfProps.age}</div>
      <div>BODY TYPE: {props.nameOfProps.body_type}</div>
      <div>WHAT YOU LIKE </div>
      <div>WHAT YOU DIDN'T LIKE </div>
      <div>FIT: {props.nameOfProps.fit}</div>
      <div>{props.nameOfProps.date}</div>
      <div>{props.nameOfProps.review_title}</div>
      <div>{props.nameOfProps.review_details}</div>
    </div>
  )
}

export default Review;