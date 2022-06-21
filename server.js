const express = require('express');
const app = express();
const PORT = 2340;

app.use((req, res)=>{
    console.log(`User navigated to path: ${req.path}`)
})

app.listen(PORT, ()=>{
    console.log(`App successfully connected on PORT: ${PORT}`)
})