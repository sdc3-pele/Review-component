const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'pg-docker',
      user : 'postgres',
      password : 'docker',
      database : 'reviews'
    }
})

let up = knex.schema.hasTable('reviews').then(function(exists) {
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
    .then(res => console.log(res)).catch(err => console.log(err))
  }
});

module.exports = knex
