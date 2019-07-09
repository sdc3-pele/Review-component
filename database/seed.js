const connection = require('./connect.js');
const faker = require('faker');

const createData = async function() {

  for(let i = 0; i < 100; i++) {


    const athletic = ['yogi', 'runner', 'dancer', 'cyclist', 'sweaty generalist'];
    const body = ['athletic', 'curvy', 'lean', 'muscular', 'petite', 'slim', 'solid'];
    const fit = ['second skin', 'tight', 'snug', 'just right', 'roomy', 'oversized', 'flowy'];

    let inputs = Math.ceil(Math.random() * 20);

    for(let j = 0; j < inputs; j++) {
      let review = {
          listing_id: i,
          date: faker.date.past(),
          review_title: faker.lorem.sentence(),
          review_details: faker.lorem.paragraph(),
          overall_rating: Math.ceil(Math.random() * 5),
          nickname_login: faker.name.firstName(),
          location: faker.address.city(),
          athletic_type: athletic[Math.floor(Math.random() * athletic.length)],
          body_type: body[Math.floor(Math.random() * body.length)],
          age: (Math.floor(Math.random() * 20)) + 30,
          what_you_liked: faker.lorem.words(),
          what_you_did_not_liked: faker.lorem.sentence(),
          fit: Math.floor(Math.random() * 7),
      };

      let q = "INSERT INTO reviews SET ?";

      await connection.query(q, review, (err, result) => {
          if(err) {
              console.log('Error loading data', err)
          } else {
              console.log('Successfully loaded data')
          }
      });
    }

  };
};

createData();