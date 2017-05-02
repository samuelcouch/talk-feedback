import http from 'http'
import express from 'express'

import { configure_express } from './lib/express_config'
import { analyze_and_save } from './lib/tone_analyzer'

let app = express()
app.server = http.createServer(app)

configure_express(app)

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/feedback', (req, res) => {
  analyze_and_save(req.body.text, () => {
    res.send(200)
  })
})

app.server.listen(process.env.PORT, () => {
	console.log(`Started on port ${app.server.address().port}`)
})
