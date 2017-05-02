import path from 'path'
import express from 'express'
import expressBrowserify from 'express-browserify'
import bodyParser from 'body-parser'
import morgan from 'morgan'

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
}
