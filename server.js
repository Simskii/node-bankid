var http = require('http');
var soap = require('soap');

var myService = {
  HelloService: {
    Hello_PortType: {
      SayHello: function(args) {
        return {
            hello: 'world',
        };
      },

      // This is how to define an asynchronous function.
      MyAsyncFunction: function(args, callback) {
          // do some work
          callback({
              name: args.name
          });
      },

      // This is how to receive incoming headers
      HeadersAwareFunction: function(args, cb, headers) {
          return {
              name: headers.Token
          };
      },

      // You can also inspect the original `req`
      reallyDetailedFunction: function(args, cb, headers, req) {
          console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
          return {
              name: headers.Token
          };
      }
    }
  }
};

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//http server example
var server = http.createServer(function(request, response) {
  response.end("404: Not Found: " + request.url);
});

server.listen(8000);
soap.listen(server, '/wsdl', myService, xml);