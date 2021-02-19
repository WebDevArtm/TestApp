const express = require('express')
const mailer = require('./nodemailer')
const multer = require('multer')
const uploads = multer({ dest: 'uploads/' })
const app = express()
const secret = require('./secret.js')

secret()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Header', 'Origin, X-Requsted-With, Content-Type, Accept');
  next();
})

app.use(uploads.any())


app.post('/', (req, res) => {
  const message = {
    to: process.env.toEmail,
    subject: 'test',
    html: `
      <ul>
        <li>name: ${req.body.name}</li>
        <li>E-mail: ${req.body.email}</li>
        <li>tel: ${req.body.tel}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p> `
  }

  const info = mailer(message)
  if (!info) {
    res.status(201).send('Error...try later please...')
  } else {
    res.status(200).send('Your message sended!')
  }
})

const port = 5000

app.listen(port, () => console.log(`Server started...${port}`))
