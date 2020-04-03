const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');

/*
{"publicKey":"BKLDlJxXBZor_1f2hZNWAF7vZQ6GpBO6nB1dgCaDtNcrtipZkBcZn73r1Sa85qmoo7JV0-3mfYGB6ZOy2p1KP7w"
,"privateKey":"o966EZaIx7JVkHWO0BjcB0JMWz4qnxS3WIAla1ELraQ"}
*/

//const PUBLIC_VAPID = 'BIoQ9r576sXiCYdmfmIDH2lOJ70mT_hDMv-2HxZahXriUrhLvAkAAbRxbFteazYHCl1DmRS0KEnEA5TjKeFJfbs'
//const PRIVATE_VAPID = '_5kCwQ3Huh9Ci8b2apcQH8krdXyWvnpnbkq4zTAqGJw'

const PUBLIC_VAPID = 'BKLDlJxXBZor_1f2hZNWAF7vZQ6GpBO6nB1dgCaDtNcrtipZkBcZn73r1Sa85qmoo7JV0-3mfYGB6ZOy2p1KP7w'
const PRIVATE_VAPID = 'o966EZaIx7JVkHWO0BjcB0JMWz4qnxS3WIAla1ELraQ'
const fakeDatabase = []
const app = express()

app.use(cors())
app.use(bodyParser.json())

//webpush.setGCMAPIKey('153519317953');
webpush.setVapidDetails('mailto:nicolas.felten@epitech.eu', PUBLIC_VAPID, PRIVATE_VAPID)

app.listen(3400, () => {
  console.log('Server started on port 3400')
})

app.post('/subscription', (req, res) => {
    const subscription = req.body;
    console.log("New subscription", req.body.userId);
    fakeDatabase.push(subscription);
    //console.log("sub ++++++>", subscription);

    res.send(req.body);
})

app.post('/sendNotification', (req, res) => {
  
  /*if (fakeDatabase.length > 0) {
		sendNotification(res);
	} else {
		res.sendStatus(403, "Error: you have to subscribe first");
  }*/
  

  console.log("SEND NOTIF");
  console.log(req.body);
    const notificationPayload = {
        notification: {
          title: 'New Notification',
          body: 'This is the body of the notification',
          icon: 'assets/icons/icon-512x512.png',
        },
      }    
      //console.log(fakeDatabase);
      //fakeDatabase.map(sub => console.log(sub.subscription));
      //Promise.all(promises).then(() => res.send("ok"), error => console.log("????"));
      //console.log("\n\n\n\n\\n\n\nn\n\n\n\n")
      //console.log(JSON.stringify(notificationPayload))

      Promise.all(fakeDatabase.map(sub => {
        
        const pushSubscription = {
          endpoint: sub.subscription.endpoint,
          keys: {
            auth: sub.subscription.keys.auth,
            p256dh: sub.subscription.keys.p256dh
          }
        };

        console.log("===========================================")
        console.log(pushSubscription)
        console.log("===========================================")
        webpush.sendNotification(pushSubscription, JSON.stringify(notificationPayload)).catch(err => {
          console.error("Error 1 sending notification, reason: ", err);
              //res.sendStatus(500);
        })
      }))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error 2 sending notification, reason: ", err);
            res.sendStatus(500);
        });
})













function initNotifPayload() {
	notifPayload = {
        "notification": {
            "title": "Nouvelle bière",
            "body": "Nous avons reçu une nouvelle bière !",
			"vibrate": [100, 50, 100],
			"icon": "assets/icons/appheraut.png",
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Commande cette bière"
            }]
        }
	};
}

function sendNotification(res) {
	console.log('send notification');
  initNotifPayload();
	Promise.all(
		fakeDatabase.map(sub => {
      console.log("++++++++++++++", JSON.stringify(sub));
			webpush.sendNotification(JSON.stringify(sub), JSON.stringify(notifPayload))
    })
	)
	.then(() => res.status(200).json({message: 'Notification sent successfully.'}))
	.catch(err => {
		console.error("Error sending notification, reason: ", err);
		res.sendStatus(500);
  });
}