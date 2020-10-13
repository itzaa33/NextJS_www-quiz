const next = require('next')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

const express = require('express')
const proxy = require('html2canvas-proxy')

app.prepare().then(() =>
{
    const server = express()

    server.use('/proxy-image', proxy())
    server.use(renderPage)
    server.listen(3000)
})

function renderPage(req, res)
{
    return handle (req, res)
}