require('dotenv').config();

const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');
const PORT = process.env.PORT;
const getControllers = require('./controllers/getControllers.js');
const postControllers = require('./controllers/postControllers.js');

app.use(express.json());
app.use(compression());

const DIST_DIR = path.join(__dirname, '../client/dist');
app.use(express.static(DIST_DIR));

app.get('/getUserInfo', getControllers.getUserInfo);

app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
})

app.post('/searchFriend', postControllers.getFriendList);

app.post('/sendFriendRequest', postControllers.sendFriendRequest);

app.post('/acceptRequest', postControllers.acceptRequest);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
