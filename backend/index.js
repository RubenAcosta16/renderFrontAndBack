import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();

app.use(cors())

app.use(express.json());

app.use(express.static('dist'))





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

app.get("/api/persons", (req, res) => {
  res.json(datos);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = datos.find((persona) => persona.id == id);

  // if(!person) res.status(404).end()
  if (!person) res.status(404).json({ message: "no se encontro" }).end();

  res.json(person);
});

app.post("/api/persons", (req, res) => {
    let person=req.body

    if(!person.name || !person.number){
      res.status(400).json({ error: 'Faltan datos' });	
    }

    person.id=datos.length+1
    datos.push(person)

    res.json(person)
})

app.put("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
    let {name,number}=req.body

    const personIndex=datos.findIndex((persona) => persona.id == id);

    if(personIndex!== -1){
      datos[personIndex] = { id, name, number };

      res.json(datos[personIndex]);
    }else{
      res.status(404).json({ error: 'Person not found' });
    }

    console.log(newPerson)
    
    res.status(200).end()
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = datos.find((persona) => persona.id == id);

  // if(!person) res.status(404).end()
  if (!person) res.status(404).json({ message: "no se encontro" }).end();

  datos = datos.filter((persona) => persona.id !== id);

  res.status(204).end()
});

app.get("/info", (req, res) => {
  res.send(`<h1>Phone has info for ${datos.length} people</h1> <br> 
    <p>${new Date()}</p>`)
})

app.listen(PORT, () => {
  console.log("run");
});
