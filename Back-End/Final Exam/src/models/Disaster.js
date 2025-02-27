import { Schema, model, Types } from "mongoose";


const disasterSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name of the disaster is required!'],
        minLength: [2, 'Name of the disaster should be at least 2 characters long!']
    },
    type: {
        type: String,
        required: [true, 'Type of the disaster is required!'],
        enum: [
            "Wildfire",
            "Flood",
            "Earthquake",
            "Hurricane",
            "Drought",
            "Tsunami",
            "Other"
        ]
    },
    year: {
        type: Number,
        required: [true, 'Year of the event is required!'],
        min: [0, 'Year should be between 0 and 2024!'],
        max: [2024, 'Year should be between 0 and 2024!']
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [3, 'Location should be at least 3 characters long!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: /^https?:\/\//,
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be at least 10 characters long!']
    },
    interestedList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Disaster = model('Disaster', disasterSchema);

export default Disaster;
