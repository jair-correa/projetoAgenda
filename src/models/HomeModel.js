const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

const HomeModel = mongoose.model('Home', HomeSchema);

//module.exports= HomeModel;

class Home{   
}

module.exports= Home;