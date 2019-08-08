require('dotenv').config({ path: '../.env' });
const faker = require('faker');
const fs = require('fs');
const knex = require('./db.js');

function generateReviews(itemId, numReviews = 2){
    let reviews = [];
    const athletic = ['yogi', 'runner', 'dancer', 'cyclist', 'sweaty generalist'];
    const body = ['athletic', 'curvy', 'lean', 'muscular', 'petite', 'slim', 'solid'];
    const fit = ['second skin', 'tight', 'snug', 'just right', 'roomy', 'oversized', 'flowy'];
    let inputs = numReviews;
    for(let j = 0; j < inputs; j++) {
      let review = {
          listing_id: itemId,
          date: faker.date.past().toJSON().replace(',',''),
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
  return reviews;
}

//inserting with batchInsert
const createDataInsert = async function(numData) {
  console.time('csvtimer')
  let grouped = [];
  for (let i = 1; i < numData; i++){
    grouped = grouped.concat(generateReviews(i));
    if (i % 1000 === 0){
      await knex.batchInsert('reviews', grouped, 2000).then(res=> console.log(res)).catch(err=>console.log(err))
      grouped = [];
    }
  }
  return Promise.resolve(true);
};


//runs seed and exits node container
knex.schema.hasTable('reviews').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('reviews', (table) => {
      table.increments('id').unique()
      table.integer('listing_id').index()
      table.date('date')
      table.string('review_title', 300)
      table.string('review_details', 500)
      table.integer('overall_rating')
      table.string('nickname_login')
      table.string('location', )
      table.string('athletic_type')
      table.string('body_type')
      table.integer('age')
      table.string('what_you_like', 300)
      table.string('what_you_did_not_like', 300)
      table.integer('fit')
    })
  }
}).then(()=> {return createDataInsert(process.env.NUM_ENTRIES)})
  .then(()=> console.timeEnd('csvtimer'))
  .catch(err=> console.log(err))
  // .then(()=> process.exit(0))
