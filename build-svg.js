const WEATHER_API_KEY = process.env.WEATHER_API_KEY

let fs = require('fs')

let weather = require('openweather-apis')
let qty = require('js-quantities')

const emojis = {
  '01d': '☀️',
  '02d': '⛅️',
  '03d': '☁️',
  '04d': '☁️',
  '09d': '🌧',
  '10d': '🌦',
  '11d': '🌩',
  '13d': '❄️',
  '50d': '🌫'
}



// Today's weather
weather.setLang('en')
weather.setCoordinate(37.517235, 127.047325)
weather.setUnits('imperial')
weather.setAPPID(WEATHER_API_KEY)

weather.getWeatherOneCall(function (err, data) {
  if (err) console.log(err)

  const degF = Math.round(data.daily[0].temp.max)
  const degC = Math.round(qty(`${degF} tempF`).to('tempC').scalar)
  const icon = data.daily[0].weather[0].icon

  fs.readFile('template.svg', 'utf-8', (error, data) => {
    if (error) {
      console.error(error)
      return
    }

    data = data.replace('{degF}', degF)
    data = data.replace('{degC}', degC)
    data = data.replace('{weatherEmoji}', emojis[icon])



    data = fs.writeFile('chat.svg', data, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  })
})
