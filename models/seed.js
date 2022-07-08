////////////////////////////////////////
// This file runs on `npm run seed`
///////////////////////////////////////

/////////////////////////////////
// import dependencies
/////////////////////////////////
const mongoose = require('./connection')
const Fruit = require('./fruit')

/////////////////////////////////
// seed code
/////////////////////////////////
// save my db connection to a variable for easy reference later
const db = mongoose.connection

//this runs the callback function when the db connection is opened from this file 
db.on('open', ()=>{
    //array of start fruits
    const startFruits = [
        {name: "Orange", color: "orange", readyToEat: false},
        {name: "Grape", color: "purple", readyToEat: false},
        {name: "Banana", color: "yellow", readyToEat: false},
        {name: "Strawberry", color: "red", readyToEat: false},
        {name: "Coconut", color: "brown", readyToEat: false},
    ]
    //when we seed data, we usually clear out the db first 
    Fruit.remove({})
    // then we create that data
        .then(deletedFruits =>{
            console.log('this is what remove returns', deletedFruits)

            //now that our delete was successful, we can create our fruits
            Fruit.create(startFruits)
                .then(data=>{
                    console.log('the new fruits', data)
                    db.close()
                })
                .catch(error=>{
                    console.log('error:', error)
                    db.close()
                })
                
        })
        .catch(error =>{
            console.log('error:', error)
            db.close()
        })
    // whether it's successful or not, we want to close our db connection
    // run npm run seed to run once, open connection and then close
})