const express = require('express');
const fs = require('fs');
// const fsPromises = require('fs').promises;
const addify = require('./addify.js');
const path = require('path');
const PORT = 3000;

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended : true}));

let act_blog = {};

app.post('/', (req, res)=>{
    fs.appendFile(path.join(__dirname, 'blogs.txt'), JSON.stringify(req.body), ()=>{
        fs.readFile(path.join(__dirname, 'blogs.txt'), 'utf8', (err, data)=>{7
            act_blog = addify(data);
            // console.log(act_blog);
            res.render('index', { title : 'Home', act_blog });
            // res.redirect('/');
        });
    });
});


app.get('/', (req, res)=>{
    res.render('index', { title : 'Home', act_blog });
});


app.get('/about', (req, res)=>{
    res.render('about', { title : 'About'});
});

app.get('/create', (req, res)=>{
    res.render('create', { title : "create new blog"});
});

app.use((req, res)=>{
    res.status(404).render('404', { title : "404 error"});
})

app.listen(3000, ()=>{
    console.log(`running on port ${PORT}`);
});