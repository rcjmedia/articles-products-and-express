const express = require('express');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');
const articles = require('./routes/articles');
const products = require(`./routes/products`);
const exphbs = require('express-handlebars');
const analytics = require('./middleware/analytics');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(analytics.analyticLogger);

/* --------- Method Override ---------- */
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.get(`/`, (req, res) => {
  res.render('landingPage');
});

/* --------- Handle Bars ---------- */
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', '.hbs');

/* --------- Routes for 'articles' and 'products' ---------- */
app.use(`/articles`, articles);
app.use(`/products`, products)

/* --------- Routes for 'articles' and 'products' ---------- */
app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.use((err, res, req, next) => {
  console.log(err);
  res.status(500).send(`Oops! Something went wrong`);
});

app.listen(process.env.EXPRESS_CONTAINER_PORT, () => {
  console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
});
