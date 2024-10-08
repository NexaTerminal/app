const path = require('path')

const express = require('express')
const csrf = require('csurf');
const expressSession = require('express-session')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

const createSessionConfig = require('./config/session');
const db = require('./data/database')
const addCsrfTokenMiddleware = require('./middlewares/csrf-token')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const checkAuthStatusMiddleware = require('./middlewares/check-auth')
const protectRoutesMiddleware = require('./middlewares/protect-routes')

const authRoutes = require('./routes/auth.routes');
const clientRoutes = require('./routes/clients.routes')
const baseRoutes = require('./routes/base.routes')
const documentsRoutes = require('./routes/documents.routes')

// const adminRoutes = require('./routes/admin.routes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware)

app.use(baseRoutes)
app.use(protectRoutesMiddleware);

app.use(authRoutes)
app.use(clientRoutes)
app.use(documentsRoutes)
// app.use('/admin', adminRoutes)

app.use(errorHandlerMiddleware)

app.use(helmet())
app.use(compression())
app.use(morgan('combined'))

db.connectToDatabase().then(function(){
    // app.listen(3000);
    console.log('connected')
    app.listen(process.env.PORT || 3000);
}).catch(function(error){
    console.log('Failed to connect to the database');
    console.log(error)
})
