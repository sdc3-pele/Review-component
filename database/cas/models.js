const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
});

//create
//revObj is the object with key/value pairs for columns/value that will be udpated
// sample insert: INSERT INTO reviews("id", "listing_id", "date", "review_title", "review_details", "overall_rating", "nickname_login", "location", "athletic_type", "body_type", "age", "what_you_like", "what_you_did_not_like", "fit") VALUES (1, 1, '2019-04-01', 'hello', 'good', 5, 'login name', 'good town', 'sweaty', 'fat', 99, 'fits good', 'not good', 1);
const newReview = (req, res) => {

    let query = `INSERT INTO reviews (
        id,
        listing_id,
        date,
        review_title,
        review_details,
        overall_rating,
        nickname_login,
        location,
        athletic_type,
        body_type,
        age,
        what_you_like,
        what_you_did_not_like,
        fit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
let values = Object.values(req.body);
return client.execute(query, values)
    .then(reviews => res.status(200).send(JSON.stringify(reviews.rows)).end())
    .catch(err => res.status(400).send(err).end())
}
//read
//prodId is an int that represents the product Id
const readReviews = (req, res) => {
    let query = `SELECT * FROM reviews.reviews WHERE listing_id=${req.params.id}`;
    return client.execute(query)
        .then(reviews => res.status(200).send(JSON.stringify(reviews.rows)).end())
        .catch(err => res.status(400).send(err).end());
}
//update
//revId is the id for the review
//revObj is the object with key/value pairs for columns/value that will be udpated
const updateReview = (req, res) => {
    //todo
    //parse rev obj, update only properties from obj.
    let query;
    return client.execute(query, prodId);
}
//delete
//revId is the id for the review
const delReview = (req, res) => {
    let revId = req.params.id;
    let query = `DELETE FROM reviews.reviews WHERE id=${revId}`;
    return client.execute(query)
        .then(reviews => res.status(200).send(JSON.stringify(reviews.rows)).end())
        .catch(err => res.status(400).send(err).end()) 
}

module.exports = {
    create: newReview,
    read: readReviews,
    update: updateReview,
    delete: delReview
}