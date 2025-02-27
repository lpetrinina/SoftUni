import { Schema, model, Types } from "mongoose";




// •	The Description should be a minimum of 10 characters long


const volcanoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: 2
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: 3
    },
    elevation: {
        type: Number,
        required: [true, 'Elevation is required!'],
        min: 0
    },
    lastEruption: {
        type: Number,
        required: [true, 'Last eruption is required!'],
        min: 0,
        max: 2024
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: /^https?:\/\//,
    },
    typeVolcano: {
        type: String,
        required: [true, 'Type volcano is required!'],
        enum: [
            'Supervolcanoes',
            'Submarine',
            'Subglacial',
            'Mud',
            'Stratovolcanoes',
            'Shield'
        ]
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: 10
    },
    voteList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },

});

const Volcano = model('Volcano', volcanoSchema);

export default Volcano;