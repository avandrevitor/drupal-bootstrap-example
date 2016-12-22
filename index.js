/*
 * @author André Vitor Miranda <andre.miranda@gft.com>
 * @package drupal-bootstrap-example
 * @version 1.0.0
 * @license MIT
 */
var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/build'));
app.use('/build', express.static(__dirname + '/build'));

app.listen(8080, function () {
    console.log('Server listening on port 8080!');
});