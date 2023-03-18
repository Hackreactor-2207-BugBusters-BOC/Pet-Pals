require('dotenv').config();

const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');
const PORT = process.env.PORT;
const { getFriendList } = require('./controllers/getControllers.js');

app.use(express.json());
// app.use(compression());

const DIST_DIR = path.join(__dirname, '../client/dist/bundle.js');
app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
})

app.get('/getFriendList', getFriendList);

app.post('/searchFriend', (req, res) => {
  console.log('search param: ', req.body.searchQuery);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
