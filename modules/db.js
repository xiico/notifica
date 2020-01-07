
var mongoose = require('mongoose');
var log = require('./log');
var request = require('./request');

Object.defineProperty(global, '__stack', {
    get: function(){
      var orig = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack){ return stack; };
      var err = new Error;
      Error.captureStackTrace(err, arguments.callee);
      var stack = err.stack;
      Error.prepareStackTrace = orig;
      return stack;
    }
  });
  
  Object.defineProperty(global, '__line', {
    get: function(){
      return __stack[1].getLineNumber();
    }
  });

  Object.defineProperty(global, '__func', {
    get: function(){
      return __stack[1].getFunctionName();
    }
  });


  Object.defineProperty(global, '__file', {
    get: function(){
      return __stack[1].getFileName();
    }
  });

//models
var Development = require('../models/development');

// configuration ===============================================================
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }); // connect to our database

function getNotifiables(error, callback) {
    Development.find({ "date": { "$lt": new Date() } }, function (err, developments) {
        if (err){
            console.log(log.timeStamp(), 'at',__func,__file+':'+__line, "\n" + err);
            return;
        }
        console.log(log.timeStamp(), `itens: ${developments.length}`);
        console.log(log.timeStamp(), `iten[0]: ${developments[0]}`);
        request.get('/testapi/luckynumber', (err,result) => console.log('result:', result))
    });
}



module.exports =
    {
        getNotifiables: getNotifiables
    }