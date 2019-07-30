require('dotenv').config()
const faker = require('faker');
const util = require('util')
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const knex = require('./pg/db.js');

function batchReviews(){
  let count = 1;
  return function generateReviews(itemId, numReviews = 2){
    let reviews = [];
    const athletic = ['yogi', 'runner', 'dancer', 'cyclist', 'sweaty generalist'];
    const body = ['athletic', 'curvy', 'lean', 'muscular', 'petite', 'slim', 'solid'];
    const fit = ['second skin', 'tight', 'snug', 'just right', 'roomy', 'oversized', 'flowy'];
    let inputs = numReviews;
    for(let j = 0; j < inputs; j++) {
      let review = {
          id: count,
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
      count++
    }
  return reviews;
  }
}

//inserting with batchInsert
const createDataInsert = async function(numData) {
  console.time('csvtimer')
  let grouped = [];
  let generator = batchReviews();
  for (let i = 1; i < numData; i++){
    grouped = grouped.concat(generator(i));
    if (i % 1000 === 0){
      await knex.batchInsert('reviews', grouped, 2000).then(res=> console.log(res)).catch(err=>console.log(err))
      grouped = [];
    }
  }
  return Promise.resolve(true);

};

//Creating a CSV
const createDataCsv = async function(numData) {
  let stream = fs.createWriteStream(__dirname + '/data.csv');
  stream.on('close', function () {
    console.log('CSV Writing Complete!');
  })
  // stream.on('drain', function () {
  //   console.log('draining');
  // })
  stream.on('error', function () {
    console.log('error writing CSV file');
  })
  stream.on('pause', function(){
    console.log('stream paused')
  })
  console.log('Generating CSV with ' + numData + ' products')
  console.time('csvtimer')
  let generator = batchReviews();
  while (numData > 0){
    let reviews = generator(numData);
    if (numData % 1000 === 0) console.log(numData);
    for (let i = 0; i < reviews.length; i++){
       if(!stream.write(Object.values(reviews[i]).join(',') + '\r\n')){
         await new Promise(resolve => stream.once('drain', resolve));
       };
    }
    numData--
  }
  // fs.writeFileSync('data.csv', csv);
  // stream.end()
  return Promise.resolve(true);
};

if (process.env.DB === 'pg'){
  createDataCsv(process.env.NUM_ENTRIES)
    .then(async () => await knex)
    .then(async () => {
      console.log(`Copying to ${process.env.PG_DOCKER_NAME} container`)
      await exec(`docker cp ${__dirname}/data.csv ${process.env.PG_DOCKER_NAME}:/`)
    })
    .then(async()=> {
      console.log('Importing into postgres DB')
      await exec(`docker exec ${process.env.PG_DOCKER_NAME} psql -U postgres reviews -c "\\copy reviews from data.csv with (format 'csv');"`);
    })
    .then(()=> console.timeEnd('csvtimer')).catch(err=> console.log(err))
    .then(()=> process.exit(0))
}

//docker cp data.csv cas-docker:/
// COPY reviews("id", "listing_id", "date", "review_title", "review_details", "overall_rating", "nickname_login", "location", "athletic_type", "body_type", "age", "what_you_like", "what_you_did_not_like", "fit") FROM 'data.csv'
