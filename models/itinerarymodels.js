const mongoose = require("mongoose")

const itinerariesSchema = new mongoose.Schema({
    nameItinerary: { type: String, required: true },
    userName: { type: String, required: true },
    userPhoto: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    hashtags: { type: String, required: true },
    like: { type: String, required: true },
    cityId: { type: String, required: true }
})

const itineraries = mongoose.model("itinerary", itinerariesSchema)
module.exports = itineraries 
