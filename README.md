# WawaMelon

This is a "Reviews" Module of WawaMelon.
# Instructions

Run npm install to install modules.
Run npm build:prod to build the bundle.js using webpack.
Create a .env file with DB=cas or DB=pg. (cas for Cassandra, pg for Postgres)
See instructions below for DB configurations.
Both configurations require docker to be installed.

Postgres configuration
1. PG server is run with the postgres docker container.  To start the service run: docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=reviews -d -p 5432:5432 postgres
2. Run node database/pg/db.js (to create schema and establish connection).
3. Run node database/pg/seeddb.js (to seed database with 20 mil entries, will take about 30 mintues to run this way).
4. Run npm start.

Cassandra configuration
1. Cassandra server is run with the cassandra docker container.  Use the following command:
  docker run --name cas-docker -d -p 9042:9042 cassandra
2. Run node database/cas/db.js (to create keyspace and table schema)
3. Run node database/cas/seeddb.js this will generate a CSV that has 20mil rows, (will take about 16mins to run)
4. Copy the CSV file to the Cassandra docker container using docker cp database/cas/data.csv cas-docker:/
5. Initiate the copying of the CSV to the database by running:
    docker exec cas-docker cqlsh -e "COPY reviews.reviews("id", "listing_id", "date", "review_title", "review_details", "overall_rating", "nickname_login", "location", "athletic_type", "body_type", "age", "what_you_like", "what_you_did_not_like", "fit") FROM 'data.csv'"
6. Run npm start.

# API

GET '/api/reviews/:id'
Returns all reviews corresponding to listing_id

PUT '/api/reviews/:revid'
Updates the review based on the id (review id)
Returns the id

POST '/api/reviews/create/'
Creates a new review, automatically assigned review id.  Input is an object that contains all information relevant to the review.
Returns id

DELETE '/api/reviews/:revid'
Deletes review based on id (review id)
Returns id

## Related Modules

  - https://github.com/fec3-galadriel/mike-photo-carousel
  - https://github.com/fec3-galadriel/matt-item-summary
  - https://github.com/fec3-galadriel/garrett-related-products


## Usage

Ensure you have mysql and node installed.
You can check by running the command which mysql/which node from inside the terminal.

Navigate to database, make a copy of "config.example.js" file, rename it to "config.js" and enter your username and password to gain access to MySQL RDBMS on your local machine.

Run in the different terminal windows within the root directory:
- "npm install", then "npm run reset:db", and then "npm run seed:db"
- "npm run build:dev" OR "npm run prod:dev" (depending on mode)***
- "npm run start:dev"

 *** Option 'development' sets process.env.NODE_ENV on DefinePlugin to value development. Enables NamedChunksPlugin and NamedModulesPlugin.
 Option 'production' sets process.env.NODE_ENV on DefinePlugin to value production. Enables FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin and TerserPlugin .
 You can read more at https://webpack.js.org/configuration/mode/