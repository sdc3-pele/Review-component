const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'docker',
    host: 'localhost',
    database: 'reviews',
    port: 5432,
});

// Docker connection string
// docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=reviews -d -p 5432:5432 -v reviews:$HOME/var/lib/postgresql/data postgres
client.connect()
client.query(`DROP TABLE IF EXISTS reviews`)
client.query("CREATE TABLE reviews(\
    id SERIAL PRIMARY KEY,\
    listing_id varchar(2) NOT NULL,\
    date date NOT NULL,\
    review_title varchar(300) NOT NULL,\
    review_details varchar(500),\
    overall_rating INT NOT NULL,\
    location varchar(25),\
    athletic_çtype varchar(25),\
    body_type varchar(25) NOT NULL,\
    age INT NOT NULL,\
    what_you_like varchar(300),\
    what_you_did_not_like varchar(300),\
    fit INT\)" , (err, res) => {
        if(err){
            console.log(err)
        }
        console.log('Connected and created Schema')
    });
