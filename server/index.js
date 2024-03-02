const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');

require('./models/User');
require('./services/passport');
const keys = require('./config/keys');

const app = express();

app.use(bodyParser.json());

require('./routes/authRoutes')(app);

require('./routes/openaiRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'output', 'dist', 'index.html'));
  });
}

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongooseURI);

app.use(express.json());

app.use((err, req, res, next) => {
  delete err.stack;
  return res
    .status(err.statusCode || 500)
    .send(err.message || 'Some error occured');
});

app.listen(3000, () => console.log('running on port 3000'));
