/////////////////////////////////
// Import dependencies
/////////////////////////////////
const express = require('express')
const User = require('../models/user')
// bcrypt is used to hash(read: encrypt) passwords
const bcrypt = require('bcryptjs')

/////////////////////////////////
// Create a route
/////////////////////////////////
const router = express.Router()

/////////////////////////////////
// list out our routes
/////////////////////////////////
// two sign uo route
//one GET to show the form
// one POST to make the db request


// FIRST route to make =========================================
router.get('/signup', (req, res)=>{
    res.render('users/signup')
})




// one POST to make the db request
// SECOND route to make =========================================
router.post('/signup', async (req, res)=>{
    
    console.log('this is our initial request body', req.body)
    // first, we need to encrypt our password
    // that's why we made this an async function
    // because the password hashing takes a little time, we want to wait until it's done before things progress
    // we need to wait for bcrypt to run its 'salt round' before continuing
    // salt rounds are like saying "encrypt this x amount of times before settling on one encryption"
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    // now that our password is hashed, we can create a user
    console.log('this is our request body after hashing', req.body)
    User.create(req.body)
        // if created successfully, we'll redirect to the login page
        .then(user =>{
            console.log('this is the new user', user)
            res.redirect('/users/login')
        })
        // if creation was unsuccessful, send the error
        .catch(err=>{
            res.json(err)
        })
})



// two login routes
// one GET to show the form
//THIRD route made! =====================================================
router.get('/login', (req, res) =>{
    res.render('users/login')
})




// one POST to login and create the session
//FOURTH route made!=====================================================
router.post('/login', async (req, res)=>{
    // take a look at our req obj
    console.log('this is the request object', req)
    // destructure data from request body 
    const {username, password} = req.body
    // console.log('this is username', username)
    // console.log('this is password', password)
    console.log('this is the session req.session')

    // first we find the user
    User.findOne({ username })
    .then(async (user)=>{
    // we check if the user exists
  // if they do, we'll compare the passw ords and makre sure it's correct
    if (user){
        // compare the pw
        // bcrypt.compare evaluates to a truthy or falsy value
        const result = await bcrypt.compare(password, user.password)

        if (result){
            // if the compare comes back truthy we store user properties in the session
            req.session.username= username
            req.session.loggedIn = true
            // redirect to the '/fruits' page
            console.log('this is the session after login', req.session)
            res.redirect('/fruits')
        } else {
            // for now just send some json error
            res.json({error: 'username or password incorrect'})
        }
    } else {
        // send error if user doesn't exist
        res.json({error: 'user does not exist'})
    }
    // if the pw is correct, wel'll use the newly create session object

     //otherwise (pw incorrect) send an error message
    })
    // if they don't we'll redirect to the sign up page
    .catch(err=>{
        console.log(err)
        res.json(err)
    })
})

// logout route
// can be a GET that calls destroy on our session
// we can add an 'are you sure' page if there is time

//FIFTH ROUTE
router.get('/logout', (req, res)=>{
    // destrou the session and redirect to the main page
    req.session.destroy(ret =>{
        console.log('this is the returned from req.session.destroy', ret)
        console.log('session has been destroyed')
        console.log(req.session)
        res.redirect('/fruits')
    })
})



/////////////////////////////////
// export our router
/////////////////////////////////

module.exports = router

