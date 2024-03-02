const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/User');
require('./services/passport');
const keys = require('./config/keys');

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

require('./routes/authRoutes')(app);

require('./routes/openaiRoutes')(app);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongooseURI);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/dist'));

//   const path = require('path');
//   app.get('*', (req, res) => {
//     console.log(path.resolve(__dirname));
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
//   });
// }

app.use((err, req, res, next) => {
  delete err.stack;
  return res
    .status(err.statusCode || 500)
    .send(err.message || 'Some error occured');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('running on port 3000'));
