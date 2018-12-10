// This endpoint is for stupid memes.
const mpv = require('node-mpv')
const player = new mpv({ audio_only: true })
const MEDIA_DIR = __dirname + '/../media/'

const ENDPOINTS = [
  '/lemon',
  '/lemon-stop',
  '/eggs'
]

function play (file) {
  player.load(MEDIA_DIR + file)
}

function stopPlaying (req, res) {
  player.stop()
  res.sendStatus(200)
}

/**
 * LEMON
 */

async function playLemon (req, res) {
  player.volume(75)
  play('lemon.mp3')
  res.sendStatus(200)
}

/**
 * EGGS
 */

function playEggs (req, res) {
  player.volume(100)
  play('eggs.mp3')
  res.sendStatus(200)
}

/**
 * Register function for endpoints
 */

module.exports.register = function (app) {
  app.get(ENDPOINTS[0], playLemon)
  app.get(ENDPOINTS[1], stopPlaying)
  app.get(ENDPOINTS[2], playEggs)
}
