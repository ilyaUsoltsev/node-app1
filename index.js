const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method},${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log(err);
        }
    });
    next();
});

//app.use((req,res,next)=>{
//    res.render('construction.hbs');
//});

app.get('/', (req,res)=>{
    res.render('home.hbs', {
        title:'Awesome HBS',
        welcome: 'Welcome you idiots!'
    })
});

app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        title:'Awesome HBS'
    });
});

app.get('/projects', (req,res)=>{
    res.render('projects.hbs',{
        title:'Awesome HBS'
    });
});

app.listen(port, ()=>{
    console.log(`listening to ${port}`)
});