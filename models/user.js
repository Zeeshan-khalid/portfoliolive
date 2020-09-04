var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now() },
    ip_detail: { type: Object },
    img: { type: String }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;