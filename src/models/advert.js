const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/edu', { useNewUrlParser: true });

const Schema = mongoose.Schema

const avertSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    create_time: { type: Date, default: Date.now },
    last_modified: { type: Date, default: Date.now }
})

export default mongoose.model('Avert',avertSchema)