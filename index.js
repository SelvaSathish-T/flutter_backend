const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const cors = require("cors");
app.use(cors());

//Node Class Cluster0
mongoose.connect("mongodb+srv://selvasathish:DilRaJzeIbaFFkUs@cluster0.tsg4fz4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("MongoDB connected successfully......");
    })
    .catch((err) => {
        console.log("Connection error ", err)
    })


const newUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName:{
        type: String,
    },
    phone : {
        type : Number
    },
    email : {
        type: String
    },
    password : {
        type: String
    },
    confirmPassword : {
        type: String
    }

});

const userDB = mongoose.model("CRUD_Assessment", newUserSchema);

//http://localhost:8000/user_post
app.post('/user_post', async (req, res) => {
    try {
        const { firstName, lastName, phone , email, password, confirmPassword } = req.body;
        const userData = new userDB( { firstName, lastName, phone , email, password, confirmPassword })
        await userData.save();
        res.json({
            Data : userData
        })
    }
    catch (error) {
        res.json({
            message: error
        })
    }
})

//http://localhost:8000/user_getone/661a33bafb89b78132e79f20
app.get('/user_getone/:id', async (req, res) => {
    try {
        const objectId = req.params.id;
        const getData = await userDB.findById(objectId);
        res.json({
            data: getData
        })
    }
    catch (error) {
        res.json({
            message: error
        })
    }
})

//http://localhost:8000/user_get
app.get('/user_get', async (req, res) => {
    try {
        const getData = await userDB.find()
        res.json({
            data: getData
        })
    }
    catch (error) {
        res.json({
            message: error
        })
    }
})

app.put('/user_edit/:id',async (req, res) => {
    try {
        const { phone } = req.body;
        const objectId = req.params.id
        const updatedData = await userDB.findByIdAndUpdate(
            objectId,
            { phone },
            { new: true }
        );

        res.json({
            data: updatedData
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

//http://localhost:8000/user_delete
app.delete('/user_delete', async (req, res) => {
    try {
        const deleteDataObjectId = req.params.id;
        const deleteData = await userDB.deleteMany();

        res.json({
            data: deleteData,   
            message: "Data deleted Scuccessfully...."
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

const PORT = 8000;

app.listen( PORT, () => {
    console.log("Server running on",PORT);
})
