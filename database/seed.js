// const connection = require('./connect.js');
const faker = require('faker');
const { Parser } = require('json2csv');
const fs = require('fs')

const createData = async function() {
  let reviews = [];
  for(let i = 0; i < 10; i++) {
    const athletic = ['yogi', 'runner', 'dancer', 'cyclist', 'sweaty generalist'];
    const body = ['athletic', 'curvy', 'lean', 'muscular', 'petite', 'slim', 'solid'];
    const fit = ['second skin', 'tight', 'snug', 'just right', 'roomy', 'oversized', 'flowy'];
    let str = i.toString();
    let inputs = Math.ceil(Math.random() * 20);
    for(let j = 0; j < inputs; j++) {
      let review = {
          listing_id: str,
          date: faker.date.past(),
          review_title: faker.lorem.sentence(),
          review_details: faker.lorem.paragraph(),
          overall_rating: Math.ceil(Math.random() * 5),
          nickname_login: faker.name.firstName(),
          location: faker.address.city(),
          athletic_type: athletic[Math.floor(Math.random() * athletic.length)],
          body_type: body[Math.floor(Math.random() * body.length)],
          age: (Math.floor(Math.random() * 20)) + 30,
          what_you_like: faker.lorem.words(),
          what_you_did_not_like: faker.lorem.sentence(),
          fit: Math.floor(Math.random() * 7)
      };
      reviews.push(review);
    }
  };
  let fields = Object.keys(reviews[0])
  const opts = { fields };
  jsonParser = new Parser(opts);
  let csv = jsonParser.parse(reviews)
  fs.writeFile('data.csv', csv, (err, result) => {
    if (err){
      console.log(err)
    }
    console.log('CSV file created')
  })
};

createData();
