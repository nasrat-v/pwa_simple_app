var express = require('express');
var router = express.Router();
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');

router.use(function (req, res, next) {
    console.log("Router used");
    next();
});

router.use(cors());
router.use(bodyParser());

module.exports = {
    notifRouter : router,
    sendNotif : sendNotification
};

const PUBLIC_VAPID = 'BKLDlJxXBZor_1f2hZNWAF7vZQ6GpBO6nB1dgCaDtNcrtipZkBcZn73r1Sa85qmoo7JV0-3mfYGB6ZOy2p1KP7w'
const PRIVATE_VAPID = 'o966EZaIx7JVkHWO0BjcB0JMWz4qnxS3WIAla1ELraQ'
const fakeDatabase = []

webpush.setVapidDetails('mailto:nicolas.felten@epitech.eu', PUBLIC_VAPID, PRIVATE_VAPID)

function checkForDoublon(subscription) {

  var index = 0
  while (index < fakeDatabase.length) {
    if (fakeDatabase[index].userId == subscription.userId) {
      fakeDatabase[index].subscription = subscription.subscription;
      console.log ("return true");
      return (true);
    }
    index = index + 1;
  }
  return false;
}

router.route('/subscription').post(function (req, res) {
    const subscription = req.body;
    console.log("New subscription", req.body.userId);
    if (checkForDoublon(subscription) == false) {
        fakeDatabase.push(subscription);
    }
    //console.log("sub ++++++>", subscription);

    res.send(req.body);
});

/*
router.route('/sendNotification').post(function (req, res) {
    console.log("SEND NOTIF");
    console.log(req.body);
      const notificationPayload = {
          notification: {
            title: 'New Notification',
            body: 'This is the body of the notification',
            icon: 'assets/icons/icon-512x512.png',
            data : {
                url : 'google.com'
            }
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
});*/

function sendNotification(user, apero) {

    console.log("Sending notification to user : ", user.id);
    //const endpointUrl = "http://localhost:3000/joinApero?user_id="+userId+"&apero_id="+aperoId;
    const notificationPayload = {
        notification: {
          title: 'New apero near your location',
          body: 'You can join the ' + apero.host_user_name +'\'s apero !',
          icon: 'assets/icons/appheraut-512x512.png',
        },
      }    
      //console.log(fakeDatabase);
      //fakeDatabase.map(sub => console.log(sub.subscription));
      //Promise.all(promises).then(() => res.send("ok"), error => console.log("????"));
      //console.log("\n\n\n\n\\n\n\nn\n\n\n\n")
      //console.log(JSON.stringify(notificationPayload))

      Promise.all(fakeDatabase.map(sub => {
        
        if (sub.userId == user.id) {
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
        }
      }))
        .then(() => console.log("Notifications sent"))
        .catch(err => {
            console.error("Error 2 sending notification, reason: ", err);
            res.sendStatus(500);
        });
}