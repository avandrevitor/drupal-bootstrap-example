/*
 * @author André Vitor Miranda <andre.miranda@gft.com>
 * @package drupal-bootstrap-example
 * @version 1.0.0
 * @license MIT
 */
var express = require('express');
var app = express();

app.get('/', function (request, response) {

});

app.listen(80, function () {
    console.log('Example app listening on port 3000!');
});