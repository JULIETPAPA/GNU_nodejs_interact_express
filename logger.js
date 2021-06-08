console.log(__filename);
console.log(__dirname);
var url = 'http://mijnlogger.io/log';

function log(message) {
  // Send an HTTP request
  console.log(message);
}

module.exports = log;


