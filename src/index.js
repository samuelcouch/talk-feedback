import http from 'http'
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

var firebase_config = {
	apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL:process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(firebase_config)

app.get('/', (req, res) => {
	res.send('all good')
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
