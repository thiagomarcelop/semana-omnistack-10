const axios = require('axios');
const Dev = require('../models/dev.model');
const parseStringAsArray = require('./utils/string-two-array');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json({devs});
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        const devExists = await Dev.findOne({github_username})
        if (devExists) return response.json(devExists);

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
        const { name = login, avatar_url, bio } = apiResponse.data;
        techsArray = parseStringAsArray(techs)
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        
        const dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });

        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray
        );

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    
        return response.json(dev);
    }
}