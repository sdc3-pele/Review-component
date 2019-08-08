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
const newReview = (req, res) => {
    return knex('reviews').insert(req.body)
        .then(newRev => res.status(201).send(JSON.stringify(newRev)).end())
        .catch(err => res.status(400).send(err).end())
}
//read
//prodId is an int that represents the product Id
const readReviews = (req, res) => {
    return knex.select().table('reviews').where({listing_id: req.params.id})
        .then(reviews => res.status(200).send(JSON.stringify(reviews)).end())
        .catch(err => res.status(400).send(err).end())
}
//update
//revId is the id for the review
//revObj is the object with key/value pairs for columns/value that will be udpated
const updateReview = (req, res) => {
    return knex('reviews').where({id: req.params.id}).update(req.body)
        .then(updatedRev => res.status(202).send(JSON.stringify(updatedRev)).end())
        .catch(err => res.status(400).send(err).end())
}
//delete
//revId is the id for the review
const delReview = (req, res) => {
    return knex('reviews').where({id: req.params.id}).del()
        .then(deletedRev => res.status(200).send(JSON.stringify(deletedRev)).end())
        .catch(err => res.status(400).send(err).end())
}

module.exports = {
    create: newReview,
    read: readReviews,
    update: updateReview,
    delete: delReview
}
