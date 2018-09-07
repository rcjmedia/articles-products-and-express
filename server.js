const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
const PORT = process.env.PORT || 8888;
const products = require('./routes/products');
const articles = require('./routes/articles');

// render the styles.css
app.use(express.static('public'));

// I don't know what this does
app.engine('.hbs', hbs({
  // 'main.hbs' exists in views/layouts/
  defaultLayout : 'main',
  extname : '.hbs'
}));

app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: true }));
// applies methodOverride to the method assigned to _method in the URL of a form submission page
app.use(methodOverride('_method'));
app.get('/', (req, res) => {
  // 'home.hbs' exists in views/
  // will use the default layout 'main' to build HTML and then render the contents of 'home' in the {{body}} section of 'main'
  res.render('home');
});

app.use('/products', products);
app.use('/articles', articles);

app.listen(PORT, () => {
  console.log(`Started app on port: ${PORT}`);
});