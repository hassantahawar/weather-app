const request= require('request');

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFzc2FudGFoYXdhciIsImEiOiJjazl3dmhvZzAwOHczM2ZwM3RxYzBhdm94In0.u5-Okh8DYG-XSPxZw97LCw&limit=1'
    request( {url, json:true},(error, { body})=>{
        if(error){
            callback('Unable to connect', undefined)
        }else if(body.features.length===0){
            callback('Invalid input value', undefined)
        }else{
            callback(error, {
                longitude: body.features[0].center[0],
                latitude : body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports= geocode;