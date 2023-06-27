const shortid = require('shortid')
const URL = require('../models/url')

async function generateNewShortUrl(req, res) {
    const sId = shortid();
    if(!req.body.url) return res.status(400).json({ error: 'url is required'})
    await URL.create({
        shortID: sId,
        redirectURl: req.body.url,
        visitHistory: []
    });

    return res.json({id: sId})
}

module.exports = {generateNewShortUrl}