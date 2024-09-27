
import mongoose from 'mongoose'

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

const url =
  `mongodb+srv://1511ruben:Gr1608grpro@cluster0.salxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  

mongoose.set('strictQuery',false)

await mongoose.connect(url)

connection.on("connected mongodb conectado", () => console.log("Mongodb connected to db"));

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})