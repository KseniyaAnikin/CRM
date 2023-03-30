import { getContactsInfo } from "./data.js";

 export async function renderClient(){

  const wrapper = document.querySelector('.client__wrapper');

  const param = new URLSearchParams(window.location.search);
  const clientId = param.get('id');
  const data = await getContactsInfo(clientId);
  console.log(data)

  const createHeader = (el) => {
    const header = document.querySelector('.client__header');
    const headerContainer = document.createElement('div');
    const logo = document.createElement('div');
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = 'Карточка клиента';

    headerContainer.classList.add('container', 'header__container');
    header.classList.add('header');
    logo.classList.add('header__logo');

    headerContainer.append(logo, headerTitle);
    header.append(headerContainer);
    el.append(header);
  };

  const createCard = (el) =>{
    const main = document.querySelector('.client__main');
    main.classList.add('main');
    const card = document.createElement('div');
    card.classList.add('client__card');
    const infoContainer = document.createElement('div');
    const title = document.createElement('h2');
    const avatar = document.createElement('div');
    avatar.classList.add('client__avatar');

    title.innerHTML = `${data.surname} ${data.name} ${data.lastName ? data.lastName : ''}`;
    const id = document.createElement('span');
    id.classList.add('client__id');
    id.innerHTML = `ID: ${data.id}`;

    const line = document.createElement('hr');
    line.classList.add('line');

    title.append(id);
    infoContainer.append(title, line);
    card.append(infoContainer, avatar)

    const contacts = data.contacts.forEach( el => {
      const contact = document.createElement('div');
      contact.classList.add('client__contact')
      contact.innerHTML = `<span class="client__contact"><img src ='./img/${el.type}.svg'/>\xa0${el.type}: ${el.value}</span> `
      infoContainer.append(contact)
    })

    const btnBack = document.createElement('a');
    btnBack.innerText = 'Назад';
    btnBack.classList.add('modal__submit', 'client__btn');
    btnBack.setAttribute('href','index.html')
    main.append(card, btnBack);
    el.append(main);
  }

  createHeader(wrapper);
  createCard(wrapper)

}

renderClient()