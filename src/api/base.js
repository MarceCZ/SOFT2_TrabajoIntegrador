//const URI = 'http://localhost:3001/';//dirección de la API local. Se va a cambiar cuando este en la nube
const URI = 'https://soft2-2024-2-backend-azdtbqdqd4acajas.eastus2-01.azurewebsites.net/';

const get = async (endpoint) => {
  return await fetch(URI + endpoint)
            .then(response => response.json())
            .then(data => {
                return data
            })
}

const post = async (endpoint, payload) => {

    const postPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    
    return await fetch(URI + endpoint, postPayload)
              .then(response => response.json())
              .then(data => {
                  return data
              })
  }

  const put = async (endpoint, payload) => {

    const postPayload = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    
    }

    return await fetch(URI + endpoint, postPayload)
              .then(response => response.json())
              .then(data => {
                  return data
              })
  }

  const remove = async (endpoint) => {

    const postPayload = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return await fetch(URI + endpoint, postPayload)
              .then(response => response.json())
              .then(data => {
                  return data
              })
  }

const base = { get, post, put, remove }

export default base;