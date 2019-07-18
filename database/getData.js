const connection = require('./connect.js');

const getReviews = (params, cb) => {

  const callback = (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  };

  const query = 'SELECT * FROM reviews WHERE listing_id = ?';
  connection.query(query, params, callback);

  // if (arguments.length === 2) {
  //   const q = 'SELECT * FROM reviews WHERE listing_id = ?';
  //   connection.query(q, params, callback);
  // } else {
  //   const q = 'SELECT * FROM reviews';
  //   connection.query(q, callback);
  // }

};

module.exports = getReviews;
