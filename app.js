const express = require("express");
const { readFile } = require("fs");
const axios = require('axios');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const ML_API_URL = process.env.ML_API_URL || 'http://ml-api:8000';

app.use(express.json())
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
function getBodyAfterDoubleNewline(text) {
    if (typeof text !== 'string' || !text.includes('\n\n')) {
        return '';
    }
    const parts = text.split(/\n\n/, 2);  // [header, body]
    return parts[1] || '';
}


function getFromHeader(text) {
    if (typeof text !== 'string') return null;
    const match = text.match(/^From: (.*?)$/m);
    return match ? match[1].trim() : null;
}

app.post('/classify', async (req, res)=>{
    try {
        let { email } = req.body;
        
        
        const from = getFromHeader(email);
        const body = getBodyAfterDoubleNewline(email) || email.trim(); 
        //console.log('From:', from);
        //console.log('Body:', body);
        const processedEmail = from ? `${from}\n\n${body}` : body;
        console.log(`${ML_API_URL}`);
        const response = await axios.post(`${ML_API_URL}/predict`,{
            email: processedEmail
        });
        res.json(response.data)
    } catch(error) {
        console.error('Error calling ML API:', error.message);
        res.status(500).json({ error: 'Failed to classify email' });
    }
});



app.listen(PORT, '0.0.0.0', () =>{
    console.log(`Server is listening on port ${PORT}`);
})


