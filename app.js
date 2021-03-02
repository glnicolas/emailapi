const express = require('express');
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

require('dotenv').config();



const app = express();
app.use(bodyParser.json());
const port = 3000;

var mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email_user,
    pass: process.env.email_password
  }
});

app.post('/send', (req, res) => {

  var mail_to = req.body.mail_to;
  var name = req.body.name;
  var phone = req.body.phone;
  var message = req.body.message;

  var mailOptions = {
    from: process.env.email_user,
    to: [mail_to, process.env.email_user],
    subject: 'Gracias por contactarme',
    text: 'Hello world',
    html: ` <h2> ¡Hola ${name}! Agradezco su intención por contactarme. </h2> 
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