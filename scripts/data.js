export  function getContactsInfo(id = ''){
  return fetch(`http://localhost:3000/api/clients/${id}`).then(res =>res.json());
// возвращает data - [] контактов
}

export async function addContactsInfo(user){
  fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    body: JSON.stringify(user) ,
  }).then(response => {
    if (response.status !== 201 ) {
      throw new Error('Network response was not ok.')
    }
    response.json();
  })
  .catch(console.error);
}


export async function deleteContact(id){
  fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE'
  }).then(response => {
    if (response.status !== 204 || response.status !== 200 ) {
      throw new Error('Network response was not ok.')
    }
    response.json();
  })
  .catch(console.error);
}

export async function changeContact(user, id){
  fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user) ,
  })
}

