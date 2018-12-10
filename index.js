// Load deps
const fs = require('fs')
const express = require('express')

// Load endpoints
const lemon = require('./endpoints/lemon.js')

// Set up express app
let APP_KEY
const app = express()
app.use(checkAppKey)

// Register endpoints
lemon.register(app)

// Middleware
function checkAppKey (req, res, next) {
  if (!req.query.hasOwnProperty('key') || req.query.key !== APP_KEY) {
    res.send('401 Unauthorized')
    return
  }
  next()
}

// Setup
function getAppKey () {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/appkey.json', (err, data) => {
      err ? reject(err) : resolve(data.toString())
    })
  })
}

async function init () {
  APP_KEY = JSON.parse(await getAppKey()).key
  app.listen(3000, () => console.log('App running!'))
}

init()
