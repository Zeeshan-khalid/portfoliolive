const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const path = require('path')
const user = require('./controllers/user')

require('./db')

const port = 3500

app.use(cors())
app.use(bodyParser.json({limit:'20mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'20mb', extended: false }))

app.use(express.static('public'))
app.use('/visitor', express.static(path.join(__dirname, 'controllers/visitor_pics')))
app.use('/api/v1', user)

// routes
// app.use(require('./route'))

app.listen(port, () => {
    console.log(`[*] amnahashmi.me is running on 0:0:0:0:${port}`)
})