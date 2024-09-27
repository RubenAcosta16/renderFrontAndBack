import axios from 'axios'
const url=import.meta.env.VITE_BACKEND_URL || "http://localhost:3001"
const baseUrl = `${url}/api/contact`

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado externamente
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    console.error("Error creating object:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado por quien llame a esta función
  }
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll, create, update 
}