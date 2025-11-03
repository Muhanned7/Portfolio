const express = require("express");
const { readFile } = require("fs");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get("/", (req,res)=>{
    res.render('index', {images: 'images/Enhanced_pic.jpg'});
    /*
    readFile('./index.ejs',(content, err)=>{
        if (err){
            console.log("file could not be read!!")
        }
        else {
            res.send(content);
        }
    });
    */
});


app.listen(PORT, ()=>{
    console.log(`the server is listening on port ${300}`);
})

