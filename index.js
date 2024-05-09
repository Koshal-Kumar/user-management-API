const express = require('express');

const app = express();
const userController = require('./controller/userController');
app.use(express.json());

app.get("/", (req, res) => {
    res.send("welcome user")
})
app.post("/adduser" ,userController.addUser )
app.post("/login" ,userController.login )
app.listen(3000 , ()=>{
    console.log('Server running at port 3000')
});
