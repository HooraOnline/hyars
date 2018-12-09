var http = require("http");
var loopback = require("loopback");
var path = require('path');
module.exports = function(Email) {
 
Email.sendMail = function(to,from,title,body,cb) {
    
    // create a custom object your want to pass to the email template. You can create as many key-value pairs as you want
    var myMessage = {heading:"سامانه همراه یار", text:"تغییر رمز عبور."}; 

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

