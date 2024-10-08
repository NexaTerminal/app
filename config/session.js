const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession);
  
    const store = new MongoDBStore({
      uri: 'mongodb+srv://terminalnexa:terminalnexa2024@nexacluster.ddjqk.mongodb.net/?retryWrites=true&w=majority',
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
            maxAge: 16 * 60 * 60 * 1000
        }
    }
}

module.exports = createSessionConfig;
