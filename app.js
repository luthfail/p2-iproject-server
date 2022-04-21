if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./routes')
const port = process.env.PORT || 3000
const errorHandler = require('./middleware/errorhandling')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})