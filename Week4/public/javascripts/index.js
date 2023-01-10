
let instructions = [];
let ingredients = [];

let addIngredientBtn = document.getElementById("add-ingredient");
let addInstructionBtn = document.getElementById("add-instruction");
let submitBtn = document.getElementById("submit");
let addRecipeBtn = document.getElementById("addRecipeButton");
let addImages = document.getElementById("image-input");

function pizza() {
    let receta1 = { name: "", ingredients: [], instructions: [] };
    fetch("/recipe/pizza").then((response) => {
        response.json().then((data) => {
            document.getElementById("recipeName").innerHTML = data.name;
            document.getElementById("recipeIng").innerHTML = data.ingredients;
            document.getElementById("recipeIns").innerHTML = data.instructions;
        });
    });
    console.log(receta1);
    res.render('index', { title: 'Express', recipe: receta1 });
}

pizza();

if (addIngredientBtn) {
    addIngredientBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let ingredient = document.getElementById("ingredients-text").value;
        ingredients.push(ingredient);
        console.log(ingredients);
    });
}

if (addInstructionBtn) {
    addInstructionBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let instruction = document.getElementById("instructions-text").value;
        instructions.push(instruction);
        console.log(instructions);
    });
}

if (submitBtn) {
    submitBtn.addEventListener("click", function () {
        let recipe = {
            name: document.getElementById("name-text").value,
            ingredients: ingredients,
            instructions: instructions,
        };
        console.log(recipe);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/recipe/");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(recipe);
        instructions = [];
        ingredients = [];

        let imagenes = document.getElementById("image-input").files;
        let formData = new FormData();
        for (let i = 0; i < imagenes.length; i++) {
            formData.append("images", imagenes[i]);
        }
        let xhr2 = new XMLHttpRequest();
        xhr2.open("POST", "/images/");
        xhr2.setRequestHeader("Content-Type", "multipart/form-data");
        xhr2.send(formData);
    });
}