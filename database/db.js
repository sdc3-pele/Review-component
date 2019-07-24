const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'docker',
      database : 'reviews'
    }
})

knex.schema.createTable('reviews', (table) => {
    table.increments('id')
    table.string('listing_id')
    table.date('date')
    table.string('review_title')
    table.string('review_details')
    table.interger('overall_rating')
    table.string('nickname_login')
    table.string('location')
    table.string('atheltic_type')
    table.string('body_type')
    table.interger('age')
    table.string('what_you_like')
    table.string('what_you_dont_like')
    table.interger('fit')
    });


module.exports = knex
// client.query("CREATE TABLE reviews(\
//     id SERIAL PRIMARY KEY,\
//     listing_id varchar(2) NOT NULL,\
//     date date NOT NULL,\
//     review_title varchar(300) NOT NULL,\
//     review_details varchar(500),\
//     overall_rating INT NOT NULL,\
//     nickname_login varchar(25) NOT NULL,\
//     location varchar(25),\
//     athletic_type varchar(25),\
//     body_type varchar(25) NOT NULL,\
//     age INT NOT NULL,\
//     what_you_like varchar(300),\
//     what_you_did_not_like varchar(300),\
//     fit INT\)" , (err, res) => {
//         if(err){
//             console.log(err)
//         }
//         console.log('Connected and created Schema')
//     });

