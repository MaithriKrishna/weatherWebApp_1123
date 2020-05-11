const path = require("path");
const express = require("express");
const app = express();
const geoLocation = require('./utils/geoLocation');
const weatherForecast = require('./utils/weatherForecast');

const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory))

app.get('/homepage', (req, res) => {
    res.sendFile(publicDirectory + '/index.html')
})

app.get('', (req, res) => {
    res.send('Hello world')
})

app.get('/products', (req, res) => {
    res.send({
        product: []
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.send({ error: 'Please enter the location to get weather information' })
    }
    geoLocation(location, (error, { lat, long } = {}) => {
        if (error) {
            return res.send({ error });
        }
        weatherForecast(lat, long, (error, weatherData) => {
            if (error) {
                return res.send({ error });
            }
            const { temperature, feelslike, weather_descriptions } = weatherData.current;
            return res.send({ location, temperature, feelslike, weather_descriptions });
        });
    })
})

app.get('*', (req, res) => {
    res.send('Oops, Something went wrong!!!!!!')
})

app.listen(port, () => {
    console.log('Server isup and running on port ' + port);
})