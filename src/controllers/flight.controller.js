
const axios = require('axios').default;
const airportData = require('../constants/airports')
const parser = require('xml2json');
const { FlightModel } = require('../model/flight.model')
module.exports.flightCronjob = async () => {
    try {
        for await (airport of airportData) {
            const { data: airportXml } = await axios.get('https://flydata.avinor.no/XmlFeed.asp', {
                params: {
                    TimeFrom: 1,
                    TimeTo: 24,
                    airport: airport.code.toUpperCase(),
                },
                headers: {
                    Accept: 'application/xml'
                }
            })
            const airportJson = parser.toJson(airportXml, { object: true })
            const { name: airportName } = airportJson.airport
            const { flight: flights } = airportJson.airport.flights
            try {
                await Promise.all(flights.map(async (flight) => {
                    let flightModel = await FlightModel.findOne({
                        uniqueId: flight.uniqueID
                    })
                    if (!flightModel) {
                        flightModel = new FlightModel()
                        flightModel.uniqueId = flight.uniqueID
                        flightModel.airline = flight.airline
                        flightModel.airport = airportName
                        flightModel.schedule_time = flight.schedule_time
                        flightModel.to = flight.airport
                        flightModel.time = flight?.status?.time || null
                        flightModel.status = flight.arr_dep
                        await flightModel.save()
                    }
                }))
            } catch (e) {
                //skip error and continue to save
            }
        }
    } catch (e) {
        //skip
    }
}

module.exports.getFlights = async (req, res, next) => {
    const { airport, to, status, limit = 100, skip = 0 } = req.query
    console.log(req.query)
    try {
        const params = {};
        if (airport)
            params.airport = airport
        if (to)
            params.to = to
        if (status)
            params.status = status
        const flights = await FlightModel.find(params).limit(parseInt(limit)).skip(parseInt(skip))
        return res.status(200).json({
            message: "Success",
            data: flights
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error"
        })
    }
}
