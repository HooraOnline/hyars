// const express = require('express');
// const   bodyParser = require('body-parser');
// const app = express();

// // Loopback defualt instruction
// module.exports = function (Email) {
//     // send an email
//     MyModel.sendEmail = function (cb) {
//         MyModel.app.models.Email.send({
//             to: 'foo@bar.com',
//             from: 'you@gmail.com',
//             subject: 'my subject',
//             text: 'بازیابی رمز عبور',
//             html: 'my <em>html</em>'
//         }, function (err, mail) {
//             console.log('email sent!');
//             cb(err);
//         });
//     }
// };
// Sample Email :))

var http = require("http");
var loopback = require("loopback");
var path = require('path');
module.exports = function(Email) {
 
Email.sendMail = function(to,from,title,body,cb) {
    
    // create a custom object your want to pass to the email template. You can create as many key-value pairs as you want
    var myMessage = {heading:"سامانه همراه یار", text:"تغییر رمز عبور."}; 
 
    // // prepare a loopback template renderer
    // var renderer = loopback.template(path.resolve(__dirname, '../../common/views/email-template.ejs'));
    // html_body = renderer(myMessage);
    
    // send email using Email model of Loopback    
    Email.app.models.Email.send({
      to: "hooraonline@gmail.com",
      from: 'partiatech1@gmail.com',
      subject: 'تغییر',
      html: html_body 
      }, function(err, mail) {
      console.log('email sent!');
      if(err) return err;
    }); 
  }
}

email.remoteMethod("sendemail", {
    accepts: [
        { arg: 'to', type: 'string' },
        { arg: 'from', type: 'string' },
        { arg: 'text', type: 'string' },
        { arg: 'callbackURL', type: 'string' }
    ],
    returns: {
        arg: "transaction",
        type: "string"
    },
    http: {
        path: "/sendemail",
        verb: "get"
    }
});

