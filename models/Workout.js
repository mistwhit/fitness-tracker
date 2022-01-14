const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    
    exercise: [
        {
            type: {
                type: String,
            },
            name: {
                type: String,
            },
            duration: {
                type: Number,
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            distance: {
                type: Number,
            },
        },
    ],
    
    totalDuration: {
        type: Number,
    },
});

const workout = mongoose.model("workout", WorkoutSchema);

module.exports = workout;