
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000; 

var configContent = fs.readFileSync('config.json');
var config = JSON.parse(configContent);

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    config.vapidKeys.publicKey,
    config.vapidKeys.privateKey
);

var app = express();
var subDatabase = [];
var notifPayload;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/subscription', function(req, res, next) {
	console.log('New subscription');
	subDatabase.push(req.body);
});

app.get('/getNotification', function(req, res, next) {
	if (subDatabase.length > 0) {
		sendNotification(res);
	} else {
		res.sendStatus(403, "Error: you have to subscribe first");
	}
});

app.listen(port, hostname, function() {
	console.log("Server launched http://" + hostname + ":" + port); 
});

function initNotifPayload() {
	notifPayload = {
        "notification": {
            "title": "Nouvelle bière",
            "body": "Nous avons reçu une nouvelle bière !",
			"vibrate": [100, 50, 100],
			"icon": "assets/icons/appheraut-128x128.png",
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
		subDatabase.map(sub =>
			webpush.sendNotification(sub, JSON.stringify(notifPayload)))
	)
	.then(() => res.status(200).json({message: 'Notification sent successfully.'}))
	.catch(err => {
		console.error("Error sending notification, reason: ", err);
		res.sendStatus(500);
	});
}