const moongose = require('mongoose');

const Schema = moongose.Schema;

let recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array
    },
    instructions: {
        type: Array
    }
});

module.exports = moongose.model('Recipes', recipeSchema);

