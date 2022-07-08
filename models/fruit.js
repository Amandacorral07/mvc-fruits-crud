// using an already connected mongoose not a fresh one from node_modules
const mongoose = require('./connection')

// inside of mongoose I want the keys that are named Schema and model
const { Schema, model } = mongoose

// Schema is the rules for the model
const fruitSchema = new Schema ({
    name: String, 
    color: String, 
    readyToEat: Boolean,
    username: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

// need to make a model
// model is the printing press
// this collection will be called fruits
const Fruit = model('Fruit', fruitSchema)

module.exports= Fruit
