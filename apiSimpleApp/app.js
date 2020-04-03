var express = require('express');
//var mysql = require('mysql');
const app = express();
const cors = require('cors');
var redis = require('redis');
var client = redis.createClient(); 
var bodyParser = require('body-parser')
var methodOverride = require('method-override');


client.on('connect', function() {
  console.log('connected');
});


app.use(cors());
app.use(bodyParser.json())
app.use(methodOverride());

app.post('/addUser', (req, res) => {

  client.hget('users:', req.body.email, function(err, reply) {

    if (reply == null) {

      client.incr("user:id:", function(err, id) {

        client.hset('users:', req.body.email, id, function(err, reply) {
          user = {
            'id': id,
            'email': req.body.email,
            'password': req.body.password,
            'lat': req.body.lat,
            'lon': req.body.lon,
            "aperos_id": id
          }
          client.hmset("user:" + id, user, function(err, reply) {

            user.password = '';
            return res.send(user);
          });
        });
      });
    } else {
      return res.send({"error": "User already exists"});
    }
  });
});

app.get('/getUser', (req, res) => {

  client.hget("users:", req.query.email, function(err, id) {

    client.hgetall("user:" + id, function(err, user) {
      if (user == null) {
        return res.send({"error": "User does not exist"});
      } else {
        if(req.query.password != user.password) {
          return res.send({"error": "Wrong password"});
        } else {
          if (req.query.lat != undefined && req.query.lon != undefined) {
              user.lat = req.query.lat;
              user.lon = req.query.lon;
              client.hmset("user:" + id, user, function(err, reply) {
                reply.password = "";
                return res.send(user);
              }) 
          } else {
            reply.password = "";
            return res.send(user);
          }
        }
      }
    })
  })
});

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
          if (distance < 20000) {
            //ici il faut envoyer newAperoId à user 
          }
        })
      }
    })
  })  
}

app.post("/addApero", (req, res) => {

  client.incr("apero:id", function(err, id) {
    newApero = {
      "id": id,
      "id_host": parseInt(req.body.id_host),
      "host_email": req.body.host_email,
      "lat": req.body.lat,
      "lon": req.body.lon,
      "address": req.body.address,
      "nb_slots": req.body.nb_slots,
      "guests_id": id,
      "date": req.body.date
    }
    client.hmset("apero:" + id, newApero, function(err, reply) {
      client.hgetall("user:" + req.body.id_host, function(err, reply) {
        client.rpush("aperos_id:" + reply.aperos_id, id, function(err, reply) {
          notifyUsers(newApero);
          return res.send(newApero);
        })
      }) 
    })
  });
})

app.get("/getAperos", (req, res) => {
  aperos = [];
  client.lrange("aperos_id:" + req.query.aperos_id, 0, -1, async function(err, reply) {
      for (key in reply) {
        let promise = new Promise((resolve, reject) => {
          client.hgetall("apero:" + reply[key], function(err, reply) {
            resolve(reply);
          })
      })
      let apero = await promise;
      aperos.push(apero);
    }
  res.send(aperos);
  })
})

app.get("/getApero", (req, res) => {
  client.hgetall("apero:" + req.query.apero_id, function(err, reply) {
    return res.send(reply);
  })
})

app.put("/updateApero", (req, res) => {

  newApero = {
    "id": parseInt(req.body.id),
    "id_host": parseInt(req.body.id_host),
    "host_email": req.body.host_email,
    "lat": req.body.lat,
    "lon": req.body.lon,
    "address": req.body.address,
    "nb_slots": req.body.nb_slots,
    "guests_id": parseInt(req.body.guests_id),
    "date": req.body.date
  }
  client.hmset("apero:" + req.body.id, newApero, function(err, reply) {
    return res.send(newApero);
  })
})

app.delete("/deleteApero", (req, res) => {
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

app.put("/joinApero", (req, res) => {

  client.rpush("guests_id:" + req.body.guests_id, req.query.user_id, function(err,rely) { 
    client.hgetall("user:" + req.query.user_id, function(err, user) {
      client.rpush("aperos_id:" + user.aperos_id, req.body.id, function(err, reply) {
        return res.send({"response": "OK"});
      })
    })
  })
})











app.delete('/deleteString', (req, res) => {
  client.del('framework', function(err, reply) {
    if (reply == 1)
      return res.send('deleted');
    else
      return res.send('string not exist');
  });
});

app.post('/postObject', (req, res) => {
  client.hmset('frameworks', {
    'javascript': 'AngularJS',
    'css': 'Bootstrap',
    'node': 'Express'
});
  return res.send('Received  an object to store');
});

app.get('/getObject', (req, res) => {
  client.hgetall('frameworks', function(err, object) {
    console.log(object);
    return res.send(object);
  });
});

app.post('/postList', (req, res) => {
  client.rpush(['frameworksList', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply); //prints 2
});
  return res.send('Received  a list to store');
});

app.get('/getList', (req, res) => {
  client.exists('frameworksList', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
        client.lrange('frameworksList', 0, -1, function(err, reply) {
          console.log(reply); // ['angularjs', 'backbone']
          return res.send(reply);
        });
    } else {
        console.log('doesn\'t exist');
        return res.send('doesn\'t exist');
    }
});
  
});





app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`)
);