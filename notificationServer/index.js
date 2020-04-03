const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');

/* {"publicKey":"BBpIBZLDwUAAiipbW0v4ecSdAdXwYa0crHkub0yAV8KJeMqydsAf8jP_ApsBMa1xT5h8N15A147_esszZOUrNt4"
,"privateKey":"BOaRorKIO-N72X2UC8ONMRrhAQreuakuBt65aoNDFeg"} */


const PUBLIC_VAPID = 'BBpIBZLDwUAAiipbW0v4ecSdAdXwYa0crHkub0yAV8KJeMqydsAf8jP_ApsBMa1xT5h8N15A147_esszZOUrNt4'
const PRIVATE_VAPID = 'BOaRorKIO-N72X2UC8ONMRrhAQreuakuBt65aoNDFeg'
const fakeDatabase = []
const app = express()

app.use(cors())
app.use(bodyParser.json())

webpush.setVapidDetails('mailto:nicolas.felten@epitech.eu', PUBLIC_VAPID, PRIVATE_VAPID)

app.listen(3400, () => {
  console.log('Server started on port 3400')
})

app.post('/subscription', (req, res) => {
    const subscription = req.body
    console.log("New subscription", req.body);
    fakeDatabase.push(subscription)
})

app.post('/sendNotification', (req, res) => {
    const notificationPayload = {
        notification: {
          title: 'New Notification',
          body: 'This is the body of the notification',
          icon: 'assets/icons/icon-512x512.png',
        },
      }
    
      const promises = []
      fakeDatabase.forEach(subscription => {
        promises.push(
          webpush.sendNotification(
            subscription,
            JSON.stringify(notificationPayload)
          )
        )
      })
      Promise.all(promises).then(() => res.sendStatus(200))
})