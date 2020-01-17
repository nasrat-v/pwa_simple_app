var express = require('express');
//var mysql = require('mysql');
const app = express();

var redis = require('redis');
var client = redis.createClient();  

client.on('connect', function() {
  console.log('connected');
});




app.post('/postString', (req, res) => {
  client.set('framework', 'Angular');
  return res.send('Received  a string to store');
});

app.get('/getString', (req, res) => {
  client.get('framework', function(err, reply) {
    console.log(reply);
    return res.send(reply);
  });
});

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