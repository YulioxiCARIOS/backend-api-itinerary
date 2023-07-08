const Router=require("express").Router()

const itinerariesControllers=require("../controllers/itinerarycontrollers")

const {getItineraries,getOneItinerary,removeItinerary,addItinerary,addMultiplesItineraries, modifyItinerary,removeManyitinerary}=itinerariesControllers

Router.route("/itineraries")
.get(getItineraries)
.post(addItinerary)
.delete(removeManyitinerary)

Router.route("/itineraries/:id")
.get(getOneItinerary)
.delete(removeItinerary)
.put(modifyItinerary)

Router.route("/multiplesitineraries")
.post(addMultiplesItineraries)


module.exports = Router