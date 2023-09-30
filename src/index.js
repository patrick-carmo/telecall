const express = require('express')
const session = require('express-session')
require('dotenv').config()
const app = express()

const rotas = require('./app/routes/rotas')
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/app/views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/assets'))
app.use(
  session({
    secret: '0000',
    resave: false,
    saveUninitialized: true,
  })
)

app.use(rotas)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})