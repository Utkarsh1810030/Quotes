const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/User');
require('./services/passport');
const keys = require('./config/keys');

// if (process.env.NODE_ENV === 'production') {
//   const path = require('path');
//   app.use(express.static(path.resolve(__dirname, 'client', 'dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, 'client', 'dist', 'index.html'),
//       function (err) {
//         if (err) {
//           res.status(500).send(err);
//         }
//       }
//     );
//   });
// }

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  if (process.env.VERCEL === '1') {
    res.send('Running on Vercel');
  } else {
    res.send('Not running on Vercel');
  }
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

require('./routes/openaiRoutes')(app);

mongoose.connect(keys.mongooseURI);

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('server is up and running');
});

app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .send(err.message || 'Some error occured');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('running on port 3000'));
