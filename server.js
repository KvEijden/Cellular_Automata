const express = require('express')
const path = require('path')

const app = express()  // start new Express app

app.use(express.static('public')) // serve the static files in the public folder

app.listen(4000, ()=>{
  console.log("App listening on port 4000")
})

// Routing section
app.get('/', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, 'public/CA.html')
  )
})