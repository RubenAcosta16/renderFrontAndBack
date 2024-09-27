import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config.js";
// import mongoose from "mongoose";
import dotenv from 'dotenv'

import connectToDb from "./db.js";
import Contact from "./models/contact.model.js";
dotenv.config()

const app = express();

app.use(cors())

app.use(express.json());

app.use(express.static('dist'))

connectToDb()





// app.use(morgan('dev'));
app.use(morgan('combined'));

let datos = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/contact",async  (req, res) => {
  try {
    const result=await Contact.find()

    res.send({
      success:true,
      message:"Success contacts get",
      data:result
    })
  } catch (error) {
    res.status(404).json({ message: "Failed to get contacts" }).end();
    res.send({
      success:false,
      message:"Failed to get contacts",
      data:result
    })
  }
  
});

app.get("/api/contact/:id", async (req, res) => {
  const id = req.params.id
  try {
    const result=await Contact.findById(id)

    if(!result){
      res.status(404).json({ message: "Contact not found" }).end();
      res.send({
        success:false,
        message:"Contact not found",
        data:result
      })
      return;
    }

    res.send({
      success:true,
      message:"Success contact get",
      data:result
    })
  } catch (error) {
    res.status(404).json({ message: "Failed to get contacts" }).end();
    res.send({
      success:false,
      message:"Failed to get contact",
      data:result
    })
  }



  // const id = Number(req.params.id);
  // const person = datos.find((persona) => persona.id == id);

  // // if(!person) res.status(404).end()
  // if (!person) res.status(404).json({ message: "no se encontro" }).end();

  // res.json(person);
});

app.post("/api/contact",async  (req, res) => {

  let person=req.body

  // if(!person.name || !person.number){
  //   res.status(400).json({ error: 'Faltan datos' });	
  // }

  try {
    const result=await Contact.create(person)

    res.send({
      success:true,
      message:"Success contacts post",
      data:result
    })
  } catch (error) {
    console.log(error)
    res.send({
      success:false,
      message:"Failed to post contact",
      data:result
    })
  }


    // person.id=datos.length+1
    // datos.push(person)

    // res.json(person)
})

app.put("/api/contact/:id",async (req,res)=>{
  const id = req.params.id
  let updatedContact=req.body

  try {
    const result=await Contact.findByIdAndUpdate(id,updatedContact,{new:true})

    res.send({
      success:true,
      message:"Success contacts put",
      data:result
    })
  } catch (error) {
    res.send({
      success:false,
      message:"Failed to post put",
      data:result
    })
  }
})



app.delete("/api/contact/:id", async (req, res) => {

  const id = req.params.id
  // let updatedContact=req.body

  try {
    await Contact.findByIdAndDelete(id)

    res.send({
      success:true,
      message:"Success contacts delete",
      data:null
    })
  } catch (error) {
    res.send({
      success:false,
      message:"Failed to delete",
      data:null
    })
  }

  // const id = Number(req.params.id);
  // const person = datos.find((persona) => persona.id == id);

  // // if(!person) res.status(404).end()
  // if (!person) res.status(404).json({ message: "no se encontro" }).end();

  // datos = datos.filter((persona) => persona.id !== id);

  // res.status(204).end()
});

app.get("/info", (req, res) => {
  res.send(`<h1>Phone has info for ${datos.length} people</h1> <br> 
    <p>${new Date()}</p>`)
})

app.listen(PORT, () => {
  console.log("run");
});

// async function connectDB(){
//   await mongoose.connect("mongodb://localhost/nextmongo")
// }