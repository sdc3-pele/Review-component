const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'docker',
      database : 'reviews'
    }
})
// const knex = require('./db.js')
//create
//revObj is the object with key/value pairs for columns/value that will be udpated
const newReview = (revObj) => {
    return knex('reviews').insert(revObj)
}
//read
//prodId is an int that represents the product Id
const readReviews = (prodId) => {
    return knex.select().table('reviews').where({listing_id: prodId})
}
//update
//revId is the id for the review
//revObj is the object with key/value pairs for columns/value that will be udpated
const updateReview = (revId, revObj ) => {
    return knex('reviews').where({id: revId}).update(revObj)
}
//delete
//revId is the id for the review
const delReview = (revId) => {
    return knex('reviews').where({id: revId}).del()
}

module.exports = {
    create: newReview,
    read: readReviews,
    update: updateReview,
    delete: delReview
}
