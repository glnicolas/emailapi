const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
//app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3001;;

var mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email_user,
    pass: process.env.email_password
  }
});

app.post('/send', (req, res) => {
  console.log(req.body);
  var mail_to = req.body.email;
  var name = req.body.nombre;
  var phone = req.body.telefono;
  var message = req.body.mensaje;

  var mailOptions = {
    from: process.env.email_user,
    to: [mail_to, process.env.email_user],
    subject: 'Gracias por contactarme',
    text: 'Hello world',
    html: ` <h2> ¡Hola ${name}! </h2> 
            <p>Es un placer poder atenderle, por lo que estaré contactandome a la brevedad. A continuación, se muestra la información que fue proporcionada: </p> 
            <table>
              <tr> 
                <td> Telefono:</td>
                <td> ${phone}</td>
              </tr>
              <tr> 
                <td> Mensaje:</td>
                <td> ${message}</td>
              </tr>
            </table>`
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(400).send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('ok');
    }
  });

})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})