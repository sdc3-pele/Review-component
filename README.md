# WawaMelon

This is a "Reviews" Module of WawaMelon.
# Instructions
For Setup in Dev enviornment
1. Clone the git repo
3. Specify env variables with .env file if desired or default values will be used. (example .env provided)
2. Docker-compose up
3. To seed Database Run: docker exec express /bin/bash -c "npm run seed:db"

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