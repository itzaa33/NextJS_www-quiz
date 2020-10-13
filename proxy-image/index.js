const express = require('express')
const proxy = require('html2canvas-proxy')

const server = express()

server.use('*', proxy())

module.exports = server