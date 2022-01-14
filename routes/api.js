const mongoose = require("mongoose");
const router = require("express").Router();
const Workout = require("../models/Workout");

// Create Workout
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    });

// Update Workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        { _id: params.id },
        { $push: { exercises: body } },
        { new: true }
    )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    });

// Get All Workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: 
                { $sum: "$exercises.duration" },
            },
        },
    ])
    .sort({ date: -1 })
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

// Get Range of Workouts
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: 
                    { $sum: "$exercises.duration" },
                totalWeight: 
                    { $sum: "$exercises.weight" },
            },
        },
    ])
    .sort({ date: -1 })
    .limit(7)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

module.exports = router;