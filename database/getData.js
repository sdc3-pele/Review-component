const connection = require('./connect.js');

const getReviews = (params, cb) => {
  console.log('getData ran');
  const q = 'SELECT * FROM reviews WHERE listing_id = ?';
  console.log(typeof params);
  connection.query(q, params, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  })
};

module.exports = getReviews;
