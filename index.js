const debug = require('debug');
const config = require('config');
const morgan = require("morgan");
const helmet = require("helmet");
const genres = require("./routes/genres");
const home = require("./routes/home");
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.use(express.static('public'));
app.use(helmet());

console.log("name : " + config.get("name"));
console.log("ip : " + config.get("mail.addr"));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Mode : development');
}

app.use('/',home);
app.use('/api/genres',genres);


app.listen(port, () => {

  df
  console.log(`listening on port ${port}...`);
  
});
