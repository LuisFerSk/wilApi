const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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
app.use(require('./routes/printer_scanner.route'))
app.use(require('./routes/maintenance.route'))
app.use(require('./routes/brand.route'))
app.use(require('./routes/support.route'))

app.use(express.static('storage'))

// Start server
app.listen(app.get('port'), () => {
    console.log('Server running on port 3001')
})


// const db = require('./models')
// db.sequelize
//     .sync({ force: true })
//     .then(() => console.log('Connection has been established successfully.'))
//     .catch(error => console.error('Unable to connect to the database:', error))


const { _initAdministrator } = require('./controllers/user.controller')
_initAdministrator()
