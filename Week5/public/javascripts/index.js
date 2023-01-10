
let instructions = [];
let ingredients = [];

let addIngredientBtn = document.getElementById("add-ingredient");
let addInstructionBtn = document.getElementById("add-instruction");
let submitBtn = document.getElementById("submit");
let addRecipeBtn = document.getElementById("addRecipeButton");
let addImages = document.getElementById("image-input");
let searchBtn = document.getElementById("searchBtn");



searchBtn.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        document.getElementById("recipeName").innerHTML = "";
        document.getElementById("recipeIng").innerHTML = "";
        document.getElementById("recipeIns").innerHTML = "";
        let receta = searchBtn.value;

        let receta1 = { name: "", ingredients: [], instructions: [] };
        fetch("http://localhost:3000/recipe/" + receta).then((response) => {
            response.json().then((data) => {
                let ingredients = [];
                let instructions = [];
                document.getElementById("recipeName").innerHTML = data.name;
                for (let i = 0; i < data.ingredients.length; i++) {
                    let li = document.createElement("li");
                    li.innerHTML = data.ingredients[i];
                    document.getElementById("recipeIng").appendChild(li);
                }
                for (let i = 0; i < data.instructions.length; i++) {
                    let li = document.createElement("li");
                    li.innerHTML = data.instructions[i];
                    document.getElementById("recipeIns").appendChild(li);
                }
                ingredients = [];
                instructions = [];
            });
        });
        console.log(receta1);


    };
});



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
        xhr.open("POST", "http://localhost:3000/recipe/");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(recipe));
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