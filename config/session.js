const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession);
  
    const store = new MongoDBStore({
      // uri: 'mongodb+srv://martinboshkoski:Mart1n990@cluster0.mo2jilq.mongodb.net/?retryWrites=true&w=majority',
     uri: "mongodb://localhost:27017",
      databaseName: 'nexa',
      collection: 'sessions'
    });
  
    return store;
  }

function createSessionConfig() {
    return {
        secret: "super-secret",
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
          maxAge: 4 * 60 * 60 * 1000, // 4 hours
        }
    }
}

module.exports = createSessionConfig;
