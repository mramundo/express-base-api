const express = require('express')
const cors = require('cors')
const compression = require('compression')
const { serve, setup } = require('swagger-ui-express')
const { boot } = require('./api/index.js')

const specifications = require('./swagger/swagger.json')

const app = express()
const port = 80

app.use(cors())
app.use(
    compression({
        filter: (request, response) => {
            return request.headers['x-no-compression'] ? false : compression.filter(request, response)
        },
    })
)

boot(app)

app.listen(port)

app.use('/', serve, setup(specifications))
app.use((error, request, response, next) => {
    response.status(500).send({
        status: 500,
        message: 'error',
        data: error.message,
    })
})
app.use((request, response, next) => {
    response.status(404).send({
        status: 404,
        message: 'error',
        data: 'not found',
    })
})
