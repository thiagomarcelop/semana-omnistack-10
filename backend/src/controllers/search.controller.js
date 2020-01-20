const Dev = require('../models/dev.model');
const parseStringAsArray = require('./utils/string-two-array');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const devs = await Dev.find({
            techs: {
                $in: parseStringAsArray(techs, true)
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000 // raio de 10km
                }
            }
        });

        return response.json({devs});
    }
}