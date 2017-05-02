import http from 'http'
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import twilio from 'twilio'
import firebase from "firebase"

import { analyze_and_save } from './lib/tone_analyzer'

let app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.server = http.createServer(app)

app.use(morgan('dev'))

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'))
})

app.post('/feedback', (req, res) => {
	if (req.body.hasOwnProperty('Body')) {
		analyze_and_save(req.body, firebase.database(), () => {
			let twiml = new twilio.TwimlResponse()
			twiml.message('THANKS FOR THE FEEDBACK!')
		  res.writeHead(200, {'Content-Type': 'text/xml'})
		  res.end(twiml.toString())
		})
	}
})

app.server.listen(process.env.PORT, () => {
	console.log(`Started on port ${app.server.address().port}`)
})
