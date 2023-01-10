var express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../model/Recipe");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("../views/index", { title: "Recetas" }); 
});

router.get("/recipe/:food", function (req, res, next) {
    let query = req.params.food;
    Recipe.find({name:query}, function (err, recipe) {
        if (err) return next(err);
        if (recipe){
            res.send(recipe[0]);
        } else {
            return res.status(404).send("Recipe not found");
        }
    })
});

router.post("/recipe/", function (req, res, next) {
    Recipe.findOne({ name: req.body.name }, (err, recipe) => {
        if (err) { return next(err); }

        if (!recipe){
            new Recipe({
                name: req.body.name,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions
            }).save((err, recipe) => {
                if (err) { return next(err); }
                res.send(recipe);
            });
        }
        else{
            res.status(400).send("Recipe already exists");
        }
    });    
});

module.exports = router;
