const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');

/*
{"publicKey":"BKLDlJxXBZor_1f2hZNWAF7vZQ6GpBO6nB1dgCaDtNcrtipZkBcZn73r1Sa85qmoo7JV0-3mfYGB6ZOy2p1KP7w"
,"privateKey":"o966EZaIx7JVkHWO0BjcB0JMWz4qnxS3WIAla1ELraQ"}
*/

const PUBLIC_VAPID = 'BKLDlJxXBZor_1f2hZNWAF7vZQ6GpBO6nB1dgCaDtNcrtipZkBcZn73r1Sa85qmoo7JV0-3mfYGB6ZOy2p1KP7w'
const PRIVATE_VAPID = 'o966EZaIx7JVkHWO0BjcB0JMWz4qnxS3WIAla1ELraQ'
const fakeDatabase = []
const app = express()

app.use(cors())
app.use(bodyParser.json())

webpush.setVapidDetails('mailto:nicolas.felten@epitech.eu', PUBLIC_VAPID, PRIVATE_VAPID)

app.listen(3400, () => {
  console.log('Server started on port 3400')
})

app.post('/subscription', (req, res) => {
    const subscription = req.body;
    console.log("New subscription", req.body.userId);
    fakeDatabase.push(subscription);

    res.send(req.body);
})

app.post('/sendNotification', (req, res) => {
  console.log("SEND NOTIF");
  console.log(req.body);
    const notificationPayload = {
        notification: {
          title: 'New Notification',
          body: 'This is the body of the notification',
          icon: 'assets/icons/icon-512x512.png',
        },
      }
    
      /*
      const promises = []
      fakeDatabase.forEach(subscription => {
        promises.push(
          webpush.sendNotification(
            subscription,
            JSON.stringify(notificationPayload)
          )
        )
      })*/

      
      console.log(fakeDatabase);
      fakeDatabase.map(sub => console.log(sub));
      //Promise.all(promises).then(() => res.send("ok"), error => console.log("????"));

      Promise.all(fakeDatabase.map(sub => {
        webpush.sendNotification(sub.subscription, JSON.stringify(notificationPayload))
      }))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
})