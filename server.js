var  schedule  =  require('node-schedule');
require('dotenv').config({ path: __dirname + '/.env' });
var db = require('./modules/db');
var log = require('./modules/log');

console.log(log.timeStamp() + " service starting...");

var everyDay1 = schedule.scheduleJob('*/1 * * * *', function () {
    try {
        db.getNotifiables();        
    } catch (error) {
        console.log(log.timeStamp(), error);
    }
});

console.log(log.timeStamp(), "service started...");