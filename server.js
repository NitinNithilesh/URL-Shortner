const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');

/* Initializing the express as app so the it can be used as app.something throughtout the application */
const app = express();

/* Connect Mongo DB with our app */
mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/* Calling the ejs file to render the display page */
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render('index', { shortUrls: shortUrls, latestShortUrl: shortUrls[shortUrls.length - 1].short });
})

/* Posting a new long url into the db - get's triggered when the user pastes a link and clicks on shorten */
app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });

  res.redirect('/');
});

/* Get's all the url from the db */
app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  res.redirect(shortUrl.full);
});

/* Listened to the port 3000 for all the activities of the app */
app.listen(process.env.PORT || 3000);
