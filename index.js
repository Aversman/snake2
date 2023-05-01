const express = require('express')

const server = 'localhost'
const port = 3000

const app = express()
app.use('/assets', express.static(__dirname + '/static/assets'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/pages/main.html')
})

app.get('/notsupported', (req, res) => {
  res.sendFile(__dirname + '/static/pages/notsupported.html')
})

async function main() {
  app.listen(port, server, () => console.log(`Listenning on http://${server}:${port}`))
}

main()