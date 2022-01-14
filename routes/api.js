const mongoose = require("mongoose");
const router = require("express").Router();
const workout = require("../models/workout");

router.post("/api/workouts", ({ body }, res) => {
    workout.create(body)
        .then((dbWorkout) => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});