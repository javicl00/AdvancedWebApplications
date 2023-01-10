var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var Recetas = require("../model/recetas.json");
/* GET home page. */

let receta = {
    name: "Pasta",
    ingredients: ["Pasta", "Salsa", "Queso"],
    instructions: ["Cocinar la pasta", "Agregar salsa", "Agregar queso"],
};

router.get('/', function (req, res, next) {
  // use fecth to get the data from the server
  res.render('index', { title: 'Express'});
});

router.get("/recipe/:food", function (req, res, next) {
  let food = req.params.food;

  let receta = Recetas.find((receta) => receta.name === food);

  // let recipe = {
  //   name: food,

  //   instructions: req.body.instructions,
  //   ingredients: req.body.ingredients
  // };

  // If we dont find the recipe send back food with empty ingridients and instructions
  if (!receta) {
    receta = {
      name: food,
      instructions: [],
      ingredients: [],
    };
    res.send(receta);
  }
  else {
    // Send back the recipe
    res.send(receta);
  }

  // res.send(recipe);
  // let recetas = JSON.parse(fs.readFileSync(path.join(__dirname, "../model/recetas.json")));
  // let receta = recetas.find((receta) => receta.name === food);
  // if (receta) {
  //   res.render("../views/index.pug", { recipe: receta, title: "Recipe" });
  // }
  // else {
  //   res.render("../views/index.pug", { recipe: recipe, title: "Recipe", name: food });
  // }
  // console.log(recipe.name);
});


router.post("/recipe", function (req, res, next) {
  let recipe = req.body;
  let recetas = JSON.parse(fs.readFileSync(path.join(__dirname, "../model/recetas.json")));
  recetas.push(recipe);
  fs.writeFileSync(path.join(__dirname, "../model/recetas.json"), JSON.stringify(recetas));
  // res.render("../views/index.pug", { recipe: recipe, title: "Recipe" });
  res.send(recipe);
});



router.post("/images", function (req, res, next) {
  // // get formData recieved from client
  // let formData = req.body;
  // // get the file from formData
  // let file = formData.images;
  // // get the file name
  // let fileName = file.name;
  // // get the file extension
  // let fileExtension = fileName.split(".").pop();
  // // create a new file name
  // let newFileName = `${Date.now()}.${fileExtension}`;
  // // create a new path
  // let newPath = path.join(__dirname, "../public/images", newFileName);
  // // create a new file
  // let newFile = fs.createWriteStream
  // // write the file
  // file.pipe(newFile);
  // // send the new file name to the client
  // res.send(newFileName);
  res.send("Images received");
});

/**
 *--> Create a <input> that is for files. It should have an id image-input. 
 *-->It should only allow images, and it can accept multiple files. 
 *-->When the submit button is pressed, it should send the image as FormData to route "/images". Put the images to formdata as a list to key "images".
 */
module.exports = router;
