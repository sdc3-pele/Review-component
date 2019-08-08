const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
});

client.connect(function (err) {
  console.log(err)
});

const keyspace = `CREATE KEYSPACE IF NOT EXISTS reviews WITH replication = 
{'class':'SimpleStrategy','replication_factor':'1'}`

const reviews =
`CREATE TABLE IF NOT EXISTS reviews.reviews(
    id int,
    listing_id int,
    date timestamp,
    review_title text,
    review_details text,
    overall_rating int,
    nickname_login text,
    location text,
    athletic_type text,
    body_type text,
    age int,
    what_you_like text,
    what_you_did_not_like text,
    fit int,
    PRIMARY KEY (listing_id, id)
    ) WITH CLUSTERING ORDER BY (id DESC);
`
client.execute(keyspace).then(res => console.log(res)).catch(err=> console.log(err))

client.execute(reviews).then(res => console.log(res)).catch(err=> console.log(err))

// client.metadata.getTable('reviews')
//   .then(function (tableInfo) {
//     console.log('Table %s', table.name);
//     table.columns.forEach(function (column) {
//        console.log('Column %s with type %j', column.name, column.type);
//     });
//   }).catch(err=> console.log(err));