const express = require('express');
const app = express();
const urlRoute = require('./routes/url')
const port = 8001;
const URL = require('./models/url')
const {connectToMongo} = require('./connect')

app.use(express.json());
app.use('/url',urlRoute);

app.get('/:shortId', async(req,res)=>{
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID
    },{
        $push:{
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectURl);
})

connectToMongo("mongodb+srv://amansaxena0179:qwertyui789456@cluster0.miukocm.mongodb.net/shortUrl").then(()=> console.log("mongoDB connected"))
app.listen(port,()=>{
    console.log('listening on port 8000')
});