const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
});

//create
//revObj is the object with key/value pairs for columns/value that will be udpated
// sample insert: INSERT INTO reviews("id", "listing_id", "date", "review_title", "review_details", "overall_rating", "nickname_login", "location", "athletic_type", "body_type", "age", "what_you_like", "what_you_did_not_like", "fit") VALUES (1, 1, '2019-04-01', 'hello', 'good', 5, 'login name', 'good town', 'sweaty', 'fat', 99, 'fits good', 'not good', 1);
const newReview = (revObj) => {
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
let values = Object.values(revObj);
return client.execute(query, values);
}
//read
//prodId is an int that represents the product Id
const readReviews = (prodId) => {
    console.log(prodId)
    let query = `SELECT * FROM reviews.reviews WHERE listing_id=${prodId}`;
    return client.execute(query);
}
//update
//revId is the id for the review
//revObj is the object with key/value pairs for columns/value that will be udpated
const updateReview = (revId, revObj ) => {
    //todo
    //parse rev obj, update only properties from obj.
    let query;
    return client.execute(query, prodId);
}
//delete
//revId is the id for the review
const delReview = (revId) => {
    let query = `DELETE FROM reviews WHERE id = ?`;
    return client.execute(query, revId);   
}

module.exports = {
    create: newReview,
    read: readReviews,
    update: updateReview,
    delete: delReview
}