const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./models')

//initialization
const app = express()

// Middleware
app.set('port', process.env.PORT || 3001)
app.set('json spaces', 2)

// Cors
app.use(cors())

// Morgan
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routes
app.use(require('./routes/auth.route'))
app.use(require('./routes/equipment.route'))

// Start server
app.listen(app.get('port'), () => {
    console.log('Server running on port 3001')
})

//Test connection
db.sequelize
    .sync({ force: true })
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error))
