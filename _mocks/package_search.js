const express = require('express')
const app = express()
const port = 5500
const package_search_response = require("./package_search.json")

app.get('/api/action/package_search', (req, res) => {
  res.send(package_search_response)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})