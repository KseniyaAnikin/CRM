import { modal } from "./modal.js";
import { getContactsInfo } from "./data.js";

const wrapper = document.querySelector('.wrapper');
const container = document.createElement('div');
container.classList.add('container', 'main__container');

const createHeader = (el) => {
  const header = document.querySelector('.header');
  const headerContainer = document.createElement('div');
  const logo = document.createElement('div');

  headerContainer.classList.add('container', 'header__container');
  header.classList.add('header');
  logo.classList.add('header__logo');

  const form = document.createElement('form');
  const inputContainer = document.createElement('div');
  const search = document.createElement('input');

  form.setAttribute('autocomplete', 'off');
  form.classList.add('header__form');
  inputContainer.classList.add('header__input-container');
  search.classList.add('header__search');
  search.placeholder = 'Введите запрос';

  inputContainer.append(search);
  form.append(inputContainer);
  headerContainer.append(logo, form);
  header.append(headerContainer);
  el.append(header)
};

const createTable = async(el) => {
  const main = document.querySelector('.main');
  main.classList.add('main');
  const header = document.createElement('h1');
  header.textContent = 'Клиенты';
  header.classList.add('main-header');
  main.append(header);
  el.append(main);

  const table = document.createElement('table');
  table.innerHTML = 
  `<tr class = 'table-headrow'>
    <th class = 'table-head'>
      <span>ID</span>
      <svg width="12" height="26" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7" clip-path="url(#clip0_121_2332)">
      <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></g>
      <defs><clipPath id="clip0_121_2332"><rect width="12" height="12" fill="white"/></clipPath></defs>
      </svg>
    </th>
    <th class = 'table-head'><span>Фамилия Имя Отчество</span>
      <svg width="29" height="14" viewBox="0 0 29 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7">
      <path d="M17.3711 11L16.6582 9.01758H13.9287L13.2305 11H12L14.6709 3.83203H15.9404L18.6113 11H17.3711ZM16.3506 8.01172L15.6816 6.06836C15.6328 5.93815 15.5645 5.73307 15.4766 5.45312C15.3919 5.17318 15.3333 4.9681 15.3008 4.83789C15.2129 5.23828 15.0843 5.67611 14.915 6.15137L14.2705 8.01172H16.3506ZM18.9629 8.80762V7.83105H21.4727V8.80762H18.9629ZM25.0322 8.13867L23.2646 11H21.9316L23.9434 7.87012C23.0319 7.55436 22.5762 6.8903 22.5762 5.87793C22.5762 5.22363 22.8024 4.72396 23.2549 4.37891C23.7074 4.03385 24.373 3.86133 25.252 3.86133H27.3955V11H26.2236V8.13867H25.0322ZM26.2236 4.83789H25.2959C24.8044 4.83789 24.4268 4.92578 24.1631 5.10156C23.9027 5.27409 23.7725 5.55729 23.7725 5.95117C23.7725 6.33529 23.8994 6.63477 24.1533 6.84961C24.4072 7.06445 24.8011 7.17188 25.335 7.17188H26.2236V4.83789Z" fill="#9873FF"/>
      <g clip-path="url(#clip0_121_2329)">
      <path d="M10 7L9.295 6.295L6.5 9.085L6.5 3H5.5L5.5 9.085L2.71 6.29L2 7L6 11L10 7Z" fill="#9873FF"/>
      </g></g><defs><clipPath id="clip0_121_2329"><rect width="12" height="12" fill="white" transform="translate(0 1)"/></clipPath></defs>
      </svg>
    </th>
    <th class = 'table-head'>Дата и время создания
      <svg width="12" height="26" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7" clip-path="url(#clip0_121_2332)">
      <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></g>
      <defs><clipPath id="clip0_121_2332"><rect width="12" height="12" fill="white"/></clipPath></defs>
      </svg>
    </th>
    <th class = 'table-head'>Последние изменения
      <svg width="12" height="26" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7" clip-path="url(#clip0_121_2332)">
      <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></g>
      <defs><clipPath id="clip0_121_2332"><rect width="12" height="12" fill="white"/></clipPath></defs>
      </svg>
    </th>
    <th class = 'table-head'>Контакты</th>
    <th class = 'table-head'>Действия</th>
    <th class = 'table-head'></th> 
  </tr>`

  const spinner = document.createElement('div');
  spinner.classList.add('spinner-box');
  spinner.innerHTML = `<div class="spinner-border" role="status"></div>`;

  main.append(table);
  main.append(spinner)

  const data = await getContactsInfo();
  spinner.classList.add('hide')
  data.forEach((element )=> {
      const row = document.createElement('tr');
      row.classList.add('table-row');
      row.id = `${element.id}`
      row.innerHTML = `<th>${element.id}</th>
        <th>${element.surname} ${element.name} ${element.lastName} </th>
        <th>${timeParse(element.createdAt)}</th>
        <th>${timeParse(element.updatedAt)}</th>
        <th class='contacts'>${chooseIcon(element.contacts)}</th>
        <th> 
          <button class = 'change'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7" clip-path="url(#clip0_121_2280)"><path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/></g>
            <defs><clipPath id="clip0_121_2280"><rect width="16" height="16" fill="white"/></clipPath></defs>
            </svg>
            Изменить
          </button>
        </th>
        <th>
          <button class = 'delete'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.7" clip-path="url(#clip0_121_2305)">
            <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
            </g><defs><clipPath id="clip0_121_2305"><rect width="16" height="16" fill="white"/></clipPath></defs>
            </svg>
            Удалить
          </button>
        </th>`
      table.append(row);
    });

    table.addEventListener('click', (e)=>{
      if(e.target.classList.contains('delete')){
        console.log('delete')
        modal('delete', e.target.parentNode.parentNode.id);
      }
      if(e.target.classList.contains('change')){
        console.log('change')
        modal('change', e.target.parentNode.parentNode.id);
      }
    })
};

const createAddButton = (el) => {
  const button = document.createElement('button');
  const buttonContainer = document.createElement('div');

  button.textContent = 'Добавить клиента';
  button.classList.add('main__button');
  buttonContainer.setAttribute('type', 'button')
  button.addEventListener('click', (e) => {
    modal('add');
  });

  buttonContainer.classList.add('main__button-container');
  buttonContainer.append(button);
  el.append(buttonContainer);
};

createHeader(wrapper);
createTable(wrapper)
createAddButton(wrapper);

function timeParse(currentDate){

  let newDate = new Date(currentDate);

  let day = newDate.getDate();
  day < 10 ? day = '0' + day : day = day

  let month = newDate.getMonth() + 1;
  month < 10 ? month = '0' + month : month = month;

  let year = newDate.getFullYear();

  let hour = newDate.getHours();
  hour < 10 ? hour = '0' + hour: hour = hour;

  let minutes = newDate.getMinutes(); 
  minutes < 10 ? minutes = '0' + minutes : minutes = minutes;

  return `<span>${day + '.' + month + '.' + year}</span> <span class = "table-time">${ hour + ':' + minutes}</span>`
};

function chooseIcon(contacts){
   return contacts.map( (el) =>{
    return `<img src = './img/${el.type}.svg'/>`
  }).join(' ')  
}
