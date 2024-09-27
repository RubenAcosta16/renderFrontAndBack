import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/notes";

import data from "./services/notes";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsData = await data.getAll();
        setContacts(contactsData.data);
        // console.log(contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value, // Actualiza el valor del campo correspondiente
    });
  };

  async function handleSubmit() {
    event.preventDefault();
    // console.log(formData);

    try {
      const res = await data.create(formData);

      console.log(res);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  // console.log(contacts);
  return (
    <div>
      <h1>Contactos</h1>
      <div className="">
        {contacts.map((contact, i) => (
          <div key={i}>
            <h2>{contact.name}</h2>
            <p>{contact.number}</p>
          </div>
        ))}
      </div>

      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          onChange={handleInputChange}
          value={formData.name}
        />
        <input
          type="text"
          name="number"
          placeholder="numero"
          onChange={handleInputChange}
          value={formData.number}
        />
        <button>Añadir</button>
      </form>
    </div>
  );
};

export default App;
