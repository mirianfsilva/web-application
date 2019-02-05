//OK
var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema({
   name: String,
   age : Number,
   email: String,
   account: Number,
   money: Number
});

module.exports = mongoose.model("Client", clientSchema);
