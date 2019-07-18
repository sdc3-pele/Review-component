import React from 'react';
import styled from 'styled-components';

const ReviewContainer = styled.div`
  display:flex;
  flex-direction: row;
  color: #666666;
  padding: 50px;
  font-family: Calibre,'Helvetica Neue','Helvetica','Roboto','Arial',sans-serif;
  font-size: 10px;
`;
const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex:1;
  letter-spacing: 0.15em;
  line-height: 1.8em;
`;
const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex:2;
  letter-spacing: 0.15em;
  line-height: 1.8em;
  font-style: bold;
  line-height: 1.2;
`;
const ReviewStar = styled.div`
  color: #938454;

`;
const Nickname = styled.div`
  color: #938454;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Location = styled.div`
  display: flex;
  flex-direcrtion: row;
  text-transform: uppercase;
`;
const AthleticType = styled.div`
  display: flex;
  flex-direcrtion: row;
  text-transform: uppercase;
`;
const Age = styled.div`

`;
const BodyType = styled.div`
  display: flex;
  flex-direcrtion: row;
  text-transform: uppercase;
  margin-bottom: 20px;
`;
const WhatYouLike = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  font-size: 10px;
  font-weight: bold;
`;
const WhatYouDidNotLike = styled.div`
  margin-right: 20px;
  font-size: 10px;
  font-weight: bold;
`;

const Span1 = styled.div`
  color: #999999;
  font-size: 10px;
  margin-right: 5px;
`;
const Span2 = styled.div`
  color: #777777;
  font-size: 10px;
  font-weight: bold;
`;
const Span3 = styled.div`
  font-weight: 300;
`;
const Span4 = styled.div`
  color: #938454;
`;
const Span5 = styled.div``;
const Date = styled.div`
  width: 15%;
  border-bottom:1px red solid;
  text-align: center;
  margin-bottom: 21px;
`;
const ReviewTitle = styled.div`
  margin-bottom: 20px;
`;
const ReviewDetails = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  font-weight: 300;
  border-width: 1px;
  border-bottom: 1px #666666 solid;
  border-bottom-style: dotted
`;
const ReviewClosing = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 300;
`;


const Review = (props) => {
  return(
    <ReviewContainer>


      <LeftBlock>

        <ReviewStar>{props.starFill(props.review.overall_rating)}</ReviewStar>
        <Nickname>{props.review.nickname_login}</Nickname>

        <Location>
          <Span1>LOCATION: </Span1>
          <Span2>{props.review.location}</Span2>
        </Location>

        <AthleticType>
          <Span1>ATHLETIC TYPE: </Span1>
          <Span2>{props.review.athletic_type}</Span2>
        </AthleticType>

        <Age>
          <Span1>AGE: </Span1>
          <Span2>{props.review.age}</Span2>
        </Age>

        <BodyType>
          <Span1>BODY TYPE: </Span1>
          <Span2>{props.review.body_type}</Span2>
        </BodyType>

        <WhatYouLike>WHAT YOU LIKE
          <Span3>{props.review.what_you_like} </Span3>
        </WhatYouLike>

        <WhatYouDidNotLike>WHAT YOU DIDN'T LIKE
        <Span3>{props.review.what_you_did_not_like}</Span3>
        </WhatYouDidNotLike>

      </LeftBlock>


      <RightBlock>

        <Date>{props.review.date.slice(0, 10)}</Date>
        <ReviewTitle>{props.review.review_title}</ReviewTitle>
        <ReviewDetails>{props.review.review_details}</ReviewDetails>
        <ReviewClosing><Span5>Was this review helpful for you?  </Span5>
          <Span4>   YES ( 1 )  |  NO ( 1 )  |  REPORT AS INAPROPRIATE </Span4>
        </ReviewClosing>

      </RightBlock>


    </ReviewContainer>
  )
}

export default Review;
