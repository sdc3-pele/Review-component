const faker = require('faker');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'docker',
    database : 'reviews'
  },
  pool: {min:0, max: 20}
})

const createData = async function(start, end) {
  let grouped = [];
  for(let i = start; i < end; i++) {
    let reviews = [];
    const athletic = ['yogi', 'runner', 'dancer', 'cyclist', 'sweaty generalist'];
    const body = ['athletic', 'curvy', 'lean', 'muscular', 'petite', 'slim', 'solid'];
    const fit = ['second skin', 'tight', 'snug', 'just right', 'roomy', 'oversized', 'flowy'];
    // let inputs = Math.ceil(Math.random() * 20);
    let inputs = 2;
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
          what_you_like: faker.lorem.words(),
          what_you_did_not_like: faker.lorem.sentence(),
          fit: Math.floor(Math.random() * 7)
      };
      reviews.push(review);
    }
    grouped = grouped.concat(reviews);
    // console.log(grouped)
    if (i % 1000 === 0){
      await knex.batchInsert('reviews', grouped, 2000).then(res=> console.log(res)).catch(err=>console.log(err))
      grouped = [];
    }
  };
};

// createData(1, 10000000)

async function threading(){
  let start = 1;
  let pArr = [];
  for (let i = 0; i < 10; i++){
    pArr.push(createData(start, start+1000000))
    start+=1000000;
  }
  
  await Promise.all(pArr);
  // await Promise.all([createData(1, 1000000), createData(1000000,2000000), createData(2000000,3000000), createData(3000000,4000000), createData(4000000,5000000)])
} 

threading()