const db = require('../database/connect');

module.exports = {
    listings: {
        get: function(params, callback) {
            Reviews.find({listing_id: params}).exec(function(err, result) {
                callback(err, result);
            })
        }
    },
    reviews: {
        get: function(params, callback) {
            Reviews.find({$and: [
                {listing_id: params[0]},
                {"body": {$regex: new RegExp(params[1], "i")}}
            ]}).exec(function(err, result) {
                callback(err, result);
            })
        }
    }
}
const getAllProducts = (callback) => {
  const queryString = 'SELECT * FROM products';
  connection.query(queryString, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, err);
    }
  })
};