//OK
var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema({
   name: String,
   age : String,
   email: String,
   accnumber: Number
});

module.exports = mongoose.model("Client", clientSchema);
