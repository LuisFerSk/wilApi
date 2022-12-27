const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./models')
const { _initAdministrator } = require('./controllers/user.controller')

//initialization
const app = express()
_initAdministrator()

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
app.use(require('./routes/equipment_user.route'))
app.use(require('./routes/maintenance.route'))
app.use(require('./routes/brand.route'))
app.use(require('./routes/support.route'))

// Start server
app.listen(app.get('port'), () => {
    console.log('Server running on port 3001')
})

//Test connection
db.sequelize
    .sync({ alter: true })
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error))
