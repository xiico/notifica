var https = require('https');
module.exports = {
    get: function (path, callBack) {
        https.get({
            host: process.env.HOST_URL,
            path: path,
        }, function (res) {
            // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
            res.setEncoding('utf8');

            // incrementally capture the incoming response body
            var body = '';
            res.on('data', function (d) {
                body += d;
            });

            // do whatever we want with the response once it's done
            res.on('end', function () {
                try {
                    var parsed = JSON.parse(body);
                } catch (err) {
                    console.error('Unable to parse response as JSON', err);
                    return callBack(err);
                }
                callBack(null, parsed);
            });
        }).on('error', function (err) {
            // handle errors with the request itself
            console.error('Error with the request:', err.message);
            callBack(err);
        });
    }
}