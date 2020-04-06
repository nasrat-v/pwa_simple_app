const express = require('express');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const cors = require('cors');
const redis = require('redis');
const bodyParser = require('body-parser')
const methodOverride = require('method-override');

var app = express();
var client = redis.createClient();

var pushNotifRouter = require('./notifications_push');
app.use('/', pushNotifRouter.notifRouter);

const secret = 'appheraut_some_secret';
const statusSuccess = 200;
const statusCreated = 201;
const statusUnauthorized = 401;
const statusForbidden = 403;
const statusNotFound = 404;
const statusInternalServerError = 500;

var fs = require('fs'); 
var http = require('http'); 
var https = require('https'); 
var privateKey  = fs.readFileSync('ssl/server.key', 'utf8'); 
var certificate = fs.readFileSync('ssl/server.crt', 'utf8');  
var credentials = {key: privateKey, cert: certificate}; 
//var express = require('express'); 
//var app = express();  
// your express configuration here  
/*var httpServer = http.createServer(app); 
var httpsServer = https.createServer(credentials, app);  
httpServer.listen(8080); 
httpsServer.listen(3000, () => {
  console.log("listen on port 3000")
})*/

client.on('connect', function() {
  console.log('connected');
});

app.use(cors());
app.use(bodyParser.json())
app.use(methodOverride());
app.use(expressJWT({ secret: secret})
  .unless(
      { path: [
          '/addUser',
          '/logIn'
      ]}
));
  
function initNewUserDb(userBody, id) {
  return {
    'id': id,
    'aperos_id': id,
    'lat': userBody.user_loc.lat,
    'lon': userBody.user_loc.lon,
    'email': userBody.email,
    'user_name': userBody.user_name,
    'password': userBody.password
  };
}

function formatUserDbForClient(userDb) {
  return {
    'id': userDb.id,
    'aperos_id': userDb.aperos_id,
    'email': userDb.email,
    'user_name': userDb.user_name,
    'user_loc': {
      'lat': userDb.lat,
      'lon': userDb.lon
    }
  };
}

function updateDbUserLocation(userDb, newLoc, callback) {
  userDb.lat = newLoc.lat;
  userDb.lon = newLoc.lon;
  client.hmset("user:" + userDb.id, userDb, function(err, reply) {
    callback();
  });
}

function addUser(userBody, callback) {
  client.incr("user:id:", function(err, id) {
    client.hset('users:', userBody.email, id, function(err, reply) {
      var newUser = initNewUserDb(userBody, id);

      client.hmset("user:" + id, newUser, function(err, reply) {
        callback();
      });
    });
  });
}

app.get('/getNbUsers', (req, res) => {
  var nb = 0;

  client.hgetall("users:", function(err, users) {
    for (key in users){
      nb += 1;
    }
    res.status(statusSuccess).json({"is_success": true, "msg": nb});
  });
});

app.post('/updateUserInfo', (req, res) => {
  var userBody = req.body;
  console.log(userBody);
  user = {
    'id': userBody.id,
    'aperos_id': userBody.id,
    'email': userBody.email,
    'user_name': userBody.user_name
  }
  client.hmset("user:" + userBody.id, user, function(err, reply) {
    console.log(user);
    res.status(statusSuccess).json({"is_success": true, "msg": "User updated", "user": user});
  });
})

app.post('/addUser', (req, res) => {
  var userBody = req.body;

  client.hget('users:', userBody.email, function(err, reply) {
    if (reply == null) {
      addUser(userBody, () => {
        res.status(statusCreated).json({"is_success": true, "msg": "User added"});
      });
    } else {
      res.status(statusForbidden).json({"is_success": false, "msg": "User already exists"});
    }
  });
});

app.post('/logIn', (req, res) => {
  var creds = req.body;

  client.hget("users:", creds.email, function(err, id) {
    client.hgetall("user:" + id, function(err, userDb) {
      if (userDb == null) {
        res.status(statusUnauthorized).json({"is_success": false, "msg": "User does not exists"});
      } else if (userDb.password != creds.password) {
        res.status(statusUnauthorized).json({"is_success": false, "msg": "Bad password"});
      } else {
        updateDbUserLocation(userDb, creds.user_loc, () => {
          var token = jwt.sign({'id': creds.id, 'email': creds.email}, secret, { expiresIn: '60m'});
          var userClient = formatUserDbForClient(userDb);

          res.status(statusSuccess).json({
            "is_success": true, "msg": "User logged", 
            "user": userClient, "user_auth": { "token": token }
          });
        });
      }
    });
  });
});

app.get("/getUserNameById", (req, res) => { 
  client.hget("user:" + req.query.user_id, "user_name", function(err, user_name) {
    res.status(statusSuccess).json({"is_success": true, "msg": "User found", "user_name": user_name});
  })
})

function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d * 1000; // meters
}

function notifyUsers(newApero) {
  return new Promise((resolve, reject) => {
    client.hgetall("users:", function(err, users) {
      for (key in users){
        client.hgetall("user:" + users[key], function(err, user) {
          distance = measure(newApero.lat, newApero.lon, user.lat, user.lon)
          if (distance < 20000 && newApero.id_host != user.id) {
            console.log("distance ", distance);
            pushNotifRouter.sendNotif(user, newApero);
          }
        })
      }
    })
  })  
}

app.post("/addApero", (req, res) => {

  client.incr("apero:id", function(err, id) {
    console.log(req.body);
    newApero = {
      "id": id,
      "id_host": parseInt(req.body.id_host),
      "host_user_name": req.body.host_user_name,
      "libelle": req.body.libelle,
      "description": req.body.description,
      "lat": req.body.lat,
      "lon": req.body.lon,
      "address": req.body.address,
      "nb_slots": req.body.nb_slots,
      "guests_id": id,
      "date": req.body.date
    }
    client.hmset("apero:" + id, newApero, function(err, reply) {
      client.hgetall("user:" + req.body.id_host, function(err, user) {
        client.rpush("aperos_id:" + user.aperos_id, id, function(err, reply) {
          client.rpush("all_apero_id:", id, function(err, reply) {
            notifyUsers(newApero);
            return res.send(newApero);
          })
        })
      }) 
    })
  });
})

app.get("/getAperos", (req, res) => {
  
  aperos = []; 
  client.hgetall("user:" + req.query.user_id, function(err, user) {
    client.lrange("aperos_id" + user.aperos_id, function(err, user_aperos_id) {
      client.lrange("all_apero_id:", 0, -1, async function(err, all_apero_id) {
        console.log("repl", all_apero_id)
        for (key in all_apero_id) {
          let promise = new Promise((resolve, reject) => {
            client.hgetall("apero:" + all_apero_id[key], function(err, apero) {
  
              client.lrange("guests_id:" + apero.guests_id, 0, -1, function(err, guests_id) {
                apero.guests_id = guests_id;
                console.log("guestid ", guests_id)
                console.log("on a un apreo", user.id,  " " , apero.id_host);

                if (user.id == apero.id_host) {
                  console.log("user id ok !!")
                  resolve(apero);
                } 
                else if (measure(apero.lat, apero.lon, user.lat, user.lon) < 20000)
                {
                  console.log("distance ok !!")
                  resolve(apero)
                }
                else if (guests_id.includes(user)) {
                  resolve(apero)
                }
                else
                  resolve (null)
              })
            })
          })
          let apero = await promise;
          if (apero != null)
            aperos.push(apero);
        }
        res.send(aperos);
      })
    })
  })
})

app.get("/getApero", (req, res) => {
  client.hgetall("apero:" + req.query.apero_id, function(err, apero) {
    client.lrange("guests_id:" + apero.guests_id, 0, -1, async function(err, guests_id) {
      apero.guests_id = guests_id;
      return res.send(apero);
    })
  })
})

app.put("/updateApero", (req, res) => {
  newApero = {
    "id": parseInt(req.body.id),
    "id_host": parseInt(req.body.id_host),
    "host_user_name": req.body.host_user_name,
    "libelle": req.body.libelle,
    "description": req.body.description,
    "lat": req.body.lat,
    "lon": req.body.lon,
    "address": req.body.address,
    "nb_slots": req.body.nb_slots,
    "date": req.body.date
  }
  client.hmset("apero:" + req.body.id, newApero, function(err, reply) {
    return res.send(newApero);
  });
})

app.delete("/deleteApero", (req, res) => {
  client.lrem("all_apero_id:", 0, req.query.apero_id)
  client.hgetall("apero:" + req.query.apero_id, function(err, apero) {
    client.hgetall("user:" + apero.id_host, function(err, user) {
      client.lrange("guests_id:" + apero.guests_id, 0, -1, function(err, reply) {
        for (key in reply) {
          client.lrem("aperos_id:" + reply[key], 0, req.query.apero_id);
        }
        client.del("guests_id:" + req.query.apero_id);
      })
      client.lrem("aperos_id:" + user.aperos_id, 0, req.query.apero_id, function(err, reply) {
        client.del("apero:" + req.query.apero_id, function(err, reply) {
          return res.send({"response": "OK"});
        })
      })
    })  
  })  
})

app.get("/joinApero", (req, res) => {

  console.log("user_id", req.query.user_id)
  console.log("apero_id", req.query.apero_id)
  client.rpush("guests_id:" + req.query.apero_id, req.query.user_id, function(err,rely) { 
    client.hgetall("user:" + req.query.user_id, function(err, user) {
      //console.log("err" , err)
      client.rpush("aperos_id:" + user.aperos_id, req.query.apero_id, function(err, reply) {
        console.log("err", err)
        return res.send({"response": "Vous venez de rejoindre l'apéro. Buvez avec modération"});
      })
    })
  })
})



app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`)
);
