// This entire endpoint is built to respond to the phrase, "Where is lemon?"
const fetch = require('node-fetch')
const mpv = require('node-mpv')
const player = new mpv({ socket: '/tmp/youtube-mpv.sock' }, [ '--volume=80' ])

const ENDPOINTS = [
  '/lemon',
  '/lemon-stop'
]
const API_KEY = 'AIzaSyDNKqae7h0bCwkcIooDPTAXXtsJKwgXwJw'

const apiSearch = q => `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&maxResults=1&type=video&q=${q}`
const videoUrl = id => `https://youtu.be/${id}`

function get (url) {
  return fetch(url).then(resp => resp.text())
}

// Track playing status
let playing = false
ytPlayer.on('stopped', status => {
  playing = false
})

async function playLemon (req, res) {
  // Get YouTube video URL
  const videoId = await get(apiSearch('lemon'))
  player.loadStream(videoUrl(videoId))
  res.send('Where is lemon???')
}

function stopLemon (req, res) {
  if (playing) { player.stop() }
  res.send('No more lemon :(')
}

module.exports.register = function (app) {
  app.get(ENDPOINTS[0], playLemon)
  app.get(ENDPOINTS[1], stopLemon)
}
