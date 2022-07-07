const eventSourcing = require('./index');
const {connectMongoDb} = require('./database/mongo')
const schedule = require('node-schedule');
const {flightCronjob} = require('./controllers/flight.controller')

schedule.scheduleJob('*/3 * * * *', flightCronjob);

connectMongoDb()

eventSourcing
.configFromEnv()
.start();




