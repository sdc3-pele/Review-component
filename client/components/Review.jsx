import React from 'react';

const Review = (props) => {
  return(
    <div className="each_review">

      <div className="left_block">

        <div className="gold">{props.starFill(props.nameOfProps.overall_rating)}</div>
        <span className="gold uppercase big_gap">{props.nameOfProps.nickname_login}</span>

        <div><span className="props1">LOCATION: </span>
        <span className="props2 uppercase">{props.nameOfProps.location}</span></div>

        <div><span className="props1">ATHLETIC TYPE: </span>
        <span className="props2 uppercase">{props.nameOfProps.athletic_type}</span></div>

        <div><span className="props1">AGE: </span>
        <span className="props2">{props.nameOfProps.age}</span></div>

        <div><span className="big_gap props1">BODY TYPE: </span>
        <span className="props2 uppercase">{props.nameOfProps.body_type}</span></div>

        <div>WHAT YOU LIKE </div>
        <div className="props2">{props.nameOfProps.what_you_like} </div>

        <div>WHAT YOU DIDN'T LIKE </div>
        <div className="props2">{props.nameOfProps.what_you_did_not_like}</div>

      </div>

      <div className="right_block">
        <div className="red_line big_gap">{props.nameOfProps.date.slice(0, 10)}</div>
        <div className="big_gap">{props.nameOfProps.review_title}</div>
        <div className="skinny">{props.nameOfProps.review_details}</div>
        <div className="dottedLine"></div>
        <div>
          <span className="skinny">Was this review helpful for you?   </span>
          <span className="gold skinny">       YES ( 1 )  |  NO ( 1 )  |  REPORT AS INAPROPRIATE</span>
        </div>
      </div>

    </div>
  )
}

export default Review;
