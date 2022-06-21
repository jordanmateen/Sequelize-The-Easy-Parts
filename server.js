const express = require('express');
const db = require('./db');
const app = express();
const PORT = 2340;

// establishing connection to database
db.authenticate();

// Getting models
const { User } = db.models();

// Middleware
app.use((req, res, next)=>{
    console.log(`User navigated to path: ${req.path}`)
    next();
})
app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.get('/allUsers', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.post('/insertUser', async (req, res) => {
    try {
        const { firstName, lastName, email, age } = req.body;
        const newUser = await User.create({
            first_name: firstName,
            last_name: lastName,
            email,
            age
        });
        // Send back the new user's ID in the response:
        res.json({
            id: newUser.id
        });
    } catch (error) {
        res.json({error});
    }
    
})

app.listen(PORT, ()=>{
    console.log(`App successfully connected on PORT: ${PORT}`)
})