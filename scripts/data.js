export  function getContactsInfo(){
  return fetch('http://localhost:3000/api/clients').then(res =>res.json());
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
