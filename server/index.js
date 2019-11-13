var express = require('express');
var sd = require('silly-datetime');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Device = require('./models/device');
var Record = require('./models/record');

var url = "mongodb://localhost:27017/detector-lite";
mongoose.connect(url, {useNewUrlParser: true});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/test', (req, res, next) => {
    var ret = {'test?': 'yay!'};
    res.json(ret);
});

app.get('/device', (req, res, next) => {
    Device.find((err, entry) => {
        if (err) {
            return console.error(err);
        }
        res.json(entry);
    });
});

app.get('/record', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Record.find().sort({time:-1}).limit(50).exec((err, entry) => {
        if (err) {
            return console.err(err);
        }
        timeline = new Array();
        humidity_a = new Array();
        temperature_a = new Array();
        entry.forEach(obj => {
            timeline.push(obj.time);
            humidity_a.push(obj.humidity);
            temperature_a.push(obj.temp);
        })
        res.json({time: timeline, humidity: humidity_a, temperature: temperature_a});
    });
});

app.get('/portal', (req, res, next) => {
    // Find number of devices (for new device id use)
    Device.count((err, cnt) => {
        // Find device id from db and insert records value
        // Add device id to db if not found
        Device.find({'mac':req.query.mac}).limit(1).exec().then((entry) => {
            var deviceId = cnt + 1;
            if (entry.length == 0) {
                var newDevice = new Device({id:deviceId, mac:req.query.mac});
                newDevice.save();
            } else {
                deviceId = entry[0].id;
            }
            // insert reading data to db
            var data = new Record({
                id: deviceId,
                time: sd.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
                temp: req.query.temp,
                humidity: req.query.humidity
            });
            console.log(JSON.stringify(data));
            data.save();
        });
    });

    res.send(JSON.stringify(req.query));
});

app.listen(8080);
