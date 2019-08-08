// const connection = require('./connect.js');
const faker = require('faker');
const { Parser } = require('json2csv');
const fs = require('fs');



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


let writeOpts = {highWaterMark: Math.pow(2,1)};
let stream = fs.createWriteStream(__dirname + '/data.csv', writeOpts);
stream.on('close', function () {
  console.log('All done!');
})
// stream.on('drain', function () {
//   console.log('draining');
// })
stream.on('error', function () {
  console.log('error');
})
stream.on('pause', function(){
  console.log('stream paused')
})
stream.on('finish', function(){
  console.log('write finished')
})
const createData = async function(numData) {
  console.log('Generating CSV with ' + numData + ' products')
  console.time('csvtimer')
  let generator = batchReviews();
  while (numData > 0){
    let reviews = generator(numData);
    if (numData % 1000 === 0) console.log(numData);
    // if (numData % 10000 === 0) stream.drain();
    for (let i = 0; i < reviews.length; i++){
       if(!stream.write(Object.values(reviews[i]).join(',') + '\r\n')){
         await new Promise(resolve => stream.once('drain', resolve));
       };
    }
    numData--
  }
  // fs.writeFileSync('data.csv', csv);
  // stream.end()
  console.timeEnd('csvtimer')
};


// const createDataSync = function(numData) {
//   console.log('Generating CSV with ' + numData + ' products')
//   console.time('csvtimer')
//   let generator = batchReviews();
//   let csv = '';
//   while (numData > 0){
//     let reviews = generator(numData);
//     if (numData % 100000 === 0) console.log(numData);
//     // if (numData % 10000 === 0) stream.drain();
//     for (let i = 0; i < reviews.length; i++){
//       csv += Object.values(reviews[i]).join(',') + '\r\n'
//     }
//     if (numData % 100000){
//       fs.writeFile('data.csv', csv, (err) => {
//         if (err) throw err;
//         console.log('The file has been saved!');
//       });      
//       csv ='';
//     }
//     numData--
//   }
//   // fs.writeFileSync('data.csv', csv);
//   // stream.end()
//   console.timeEnd('csvtimer')
// };

createData(5000000);

//docker cp data.csv cas-docker:/
// COPY reviews("id", "listing_id", "date", "review_title", "review_details", "overall_rating", "nickname_login", "location", "athletic_type", "body_type", "age", "what_you_like", "what_you_did_not_like", "fit") FROM 'data.csv'
