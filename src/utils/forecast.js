const request =require('request');

const forecast=(latitude,longitude,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + encodeURIComponent(latitude) + 'lon=' + encodeURIComponent(longitude) + '&id=524901&APPID=cfe6fe67e42a89a66d17287c22c239ad&units=metric&cnt=1'
    request( {url, json:true},(error,{ body})=>{
        if(error){
            callback('Unable to connect', undefined)
        }else if(body.message){
            callback('Invalid Input LOCATION', undefined)
        }else{
            callback(undefined,"Current Temperature: " + body.list[0].main.temp)
        }
    })
}

module.exports= forecast;