const mongoose = require("mongoose");
const router = require("express").Router();
const Workout = require("../models/Workout");

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

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    });

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

module.exports = router;