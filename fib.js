var http = require('http');
var url = require('url');

var fibonacci = function(x, callback) {
  if (x === 0) {
    return callback(0);
  } else if (x === 1) {
    return callback(1);	  
  } else {
    return setImmediate(function() {
      return fibonacci(x - 1, function(value1) {
        return setImmediate(function() {
          return fibonacci(x - 2, function(value2) {
            return callback(value1 + value2);
          });
        });
      });
    });
  }
};

http.createServer(function (req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
        var params = url.parse(req.url);
        var number = params.pathname.substr(1);
	fibonacci(number, function (result) {
               res.end(result + "\n");
	});
}).listen(3000, "127.0.0.1");
