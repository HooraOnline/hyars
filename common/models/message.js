module.exports = function (Message) {
  Message.sendMessage = function (to, subject, text,html ,cb) {
    Message.app.models.Message.send({
      to: to,
      from: 'partiatech1@gmail.com',
      subject: subject,
      text: text,
      html: html,
    }, function (err, mail) {
      console.log('email sent!');
      cb(err);
    });
  }
  Message.remoteMethod("sendMessage", {
    accepts: [
      { arg: 'to', type: 'string' },
      { arg: 'subject', type: 'string' },
      { arg: 'text', type: 'string' },
      { arg: 'html', type: 'string' },

      // { arg: 'callbackURL', type: 'string' }
    ],
    returns: {
      arg: "transaction",
      type: "string"
    },
    http: {
      path: "/sendMessage",
      verb: "post"
    }
  });
}





