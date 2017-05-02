import path from 'path'
import express from 'express'
import expressBrowserify from 'express-browserify'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { Total } from '../../models'

export function configure_express(app) {
  app.set('view engine', 'jsx')
  app.engine('jsx', require('express-react-views').createEngine())

  const isDev = (app.get('env') === 'development')

  const browserifyier = expressBrowserify('./public/js/bundle.jsx', {
    watch: isDev,
    debug: isDev,
    extension: ['jsx'],
    transform: ['babelify'],
  })

  if (!isDev) {
    browserifyier.browserify.transform('uglifyify', { global: true })
  }

  app.get('/js/bundle.js', browserifyier)

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, '..', '..', 'public')))
  app.use(express.static(path.join(__dirname, '..', '..', 'node_modules/watson-react-components/dist/')))
  app.use('/css/react-vis', express.static(path.join(__dirname, '..', '..', 'node_modules/react-vis/dist/')));
  app.use(morgan('dev'))

  /* SETUP  DATABASE */
  Total.findById(1).then((res) => {
    if (!res) {
      Total.create({
        total: 0,
        anger: 0.0,
        disgust: 0.0,
        fear: 0.0,
        joy: 0.0,
        sadness: 0.0,
        analytical: 0.0,
        confident: 0.0,
        tentative: 0.0,
        openness: 0.0,
        conscientiousness: 0.0,
        extraversion: 0.0,
        agreeableness: 0.0,
        emotional_range: 0.0
      })
    }
  })
}
