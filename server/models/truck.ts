// const mongoose = require('mongoose')
const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const Truck = mongoose.model("Truck", truckSchema)

module.exports = Truck;
//export default User