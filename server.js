/**
 * Static server to run app locally of port 8080. 
 * Requires Node
 */

var connect = require('connect');
var serveStatic = require('serve-static');
var port = 8080;
connect().use(serveStatic(__dirname)).listen(port);
console.log("Server Running on localhost:" + port);