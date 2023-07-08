const Itineraries = require("../models/itinerarymodels")

const itinerariesControllers = {
    getItineraries: async (req, res) => {
        let itineraries
        let error = null

        try {
            itineraries = await Itineraries.find()
        } catch (err) { error = err }

        res.json({
            response: error ? "Error" : { itineraries },
            success: error ? false : true,
            error: error

        })
    },






    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null

        try {
            itinerary = await Itineraries.find({ _id: id })
        } catch (err) { error = error }
        res.json({
            response: error ? "Error" : { itinerary },
            success: error ? false : true,
            error: error

        })
    },




    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const data = req.body.data

        let itinerary
        let error = null
        try {
            itinerary = await Itineraries.findOneAndUpdate({ _id: id }, data, { new: true })
        } catch (err) { error = err }
        res.json({
            response: error ? "Error" : itinerary,
            success: error ? false : true,
            error: error
        })

    },

    addItinerary: async (req, res) => {
        const { nameItinerary, userName, userPhoto, price, duration, hashtags, like, cityId } = req.body.data

        let itinerary
        let error = null
        try {
            let verifyitinerary = await Itineraries.find({ nameItinerary: { $regex: itinerary.name, $options: "i" } })
            if (verifyitinerary.length == 0) {
                itinerary = await new Itineraries({
                    nameItinerary: nameItinerary,
                    userName: userName,
                    userPhoto: userPhoto,
                    price: price,
                    duration: duration,
                    hashtags: hashtags,
                    like: like,
                    cityId: cityId,
                }).save()
            } else {
                error = "El itinerario ya existe en la BD con el id: " + verifyitinerary[0]._id
            }
        } catch (err) { error = err }
        res.json({
            response: error ? "Error" : itinerary,
            success: error ? false : true,
            error: error
        })
    },






    addMultiplesItineraries: async (req, res) => {
        let error = []
        let itineraries = []
        for (let itinerary of req.body.data) {
            try {
                let verifyitinerary = await Itineraries.find({ nameItinerary: { $regex: itinerary.nameItinerary, $options: "i" } })
                if (verifyitinerary.length == 0) {
                    let dataItinerary = {
                        nameItinerary: itinerary.nameItinerary,
                        userName: itinerary.userName,
                        userPhoto: itinerary.userPhoto,
                        price: itinerary.price,
                        duration: itinerary.duration,
                        hashtags: itinerary.hashtags,
                        like: itinerary.like,
                        cityId: itinerary.cityId
                    }
                    await new Itineraries({
                        ...dataItinerary
                    }).save()
                    itineraries.push(dataItinerary)
                } else {
                    error.push({
                        nameItinerary: itinerary.nameItinerary,
                        result: "Ya existe en la base de datos con el Id: " + verifyitinerary[0]._id
                    })
                }

            }
            catch (err) { error.push({ nameItinerary: itinerary.nameItinerary, err }) }
        }
        res.json({
            response: error.length > 0 && itineraries.length === 0 ? "Error" : itineraries,
            success: error.length > 0 ? (itineraries.length > 0 ? "Warning" : false) : true,
            error: error
        })

    },






    removeItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null

        try {
            itinerary = await Itineraries.findOneAndDelete({ _id: id })
        } catch (err) { error = error }
        res.json({
            response: error ? "Error" : itinerary,
            success: error ? false : true,
            error: error


        })
    },











    //Eliminar varios datos al mismo tiempo
    removeManyitinerary: async (req, res) => {
        const data = req.body.data
        let itinerariesDelete = []
        let error = []
        for (let id of data) {
            try {
                let itinerary

                itinerary = await Itineraries.findOneAndDelete({ _id: id })
                console.log(itinerary)
                if (itinerary) {
                    itinerariesDelete.push(itinerary)
                } else {
                    error.push({
                        id: id,
                        error: "No se encontro el id para eliminar"
                    })
                }

            }
            catch (err) { error.push({ err, nameItinerary: itinerary.nameItinerary }) }
        }
        res.json({
            response: error.length > 0 && itinerariesDelete.length === 0 ? "Error" : itinerariesDelete,
            success: error.length > 0 ? (itinerariesDelete.length > 0 ? "Warning" : false) : true,
            error: error
        })
    }
};
module.exports = itinerariesControllers