const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

require('../src/service-helpers/db-services/db-service');

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/orders', require('../routes/order'));

module.exports = app;
