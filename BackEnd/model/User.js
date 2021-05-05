const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        //  required: true,
        min: 6,
        max: 298
    },
    email: {
        type: String,
         required: true,
        min: 6,
        max: 298
    },



    password: {
        type: String,
        required: true,
        min: 6,
        max: 298

    },
    date: {
        type: Date,
        default: Date.now
       
    },

    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "tehnicien"]
      },

    

});
module.exports = mongoose.model('User',userSchema )