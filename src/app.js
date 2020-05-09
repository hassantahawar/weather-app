const path=require('path');
const express= require('express');
const hbs= require('hbs');
const forecast= require('./utils/forecast');
const geocode= require('./utils/geocode');

const app= express()
const port= process.env.PORT || 3000;

// Define Paths
const publicDir= path.join(__dirname,'../public');
const viewPath= path.join(__dirname, '../templates/views');
const partialPath= path.join(__dirname, '../templates/partials');

//static generator
app.use(express.static(publicDir))

//handlebar generator
app.set('view engine','hbs')
app.set('views', viewPath);
hbs.registerPartials(partialPath)

//Routes
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Hassan Tahawar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Hassan Tahawar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Hassan Tahawar',
        message: 'Contact our service line for help'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'enter an address'
        })
    }else{
        geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
            if(error){
               return res.send({error:'Invalid Address'})
            }
        
            forecast(latitude,longitude, (error,forecastData)=>{
                if(error){
                    return  res.send({error:'Invalid Address'})
                }
                res.send({
                    location,
                    temperature:forecastData,
                    address: req.query.address
                })
            } )
        } )
    }
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help',
        name: 'Hassan Tahawar',
        error: 'help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Weather',
        name: 'Hassan Tahawar',
        error: '404- page not found'
    })
})

app.listen(port,()=>{
    console.log("Listening on port "+ port)
})