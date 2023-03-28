import { modal } from "./modal.js";
import { getContactsInfo } from "./data.js";
import { sorting } from './sort.js';
import { searching }  from  './search.js';

const wrapper = document.querySelector('.wrapper');
const container = document.createElement('div');
container.classList.add('container', 'main__container');

const createHeader = async(el) => {
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
  search.setAttribute('id', 'autoComplete');
  search.setAttribute('type', 'text');
  search.placeholder = 'Введите запрос';

  inputContainer.append(search);
  form.append(inputContainer);
  headerContainer.append(logo, form);
  header.append(headerContainer);
  el.append(header);
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
  `<thead>
    <tr class = 'table-headrow'>
      <th class = 'table-head'>
        <button class = 'id'>
          ID
          <svg class='tablesvg' width="12" height="26" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.7" clip-path="url(#clip0_121_2332)">
          <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></g>
          <defs><clipPath id="clip0_121_2332"><rect width="12" height="12" fill="white"/></clipPath></defs>
          </svg>
        </button>
      </th>
      <th class = 'table-head'>
        <button class = 'surname'>
          Фамилия Имя Отчество
          <span>А-Я</span>
          <svg class='tablesvg' width="12" height="26" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.7" clip-path="url(#clip0_121_2332)">
          <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></g>
          <defs><clipPath id="clip0_121_2332"><rect width="12" height="12" fill="white"/></clipPath></defs>
          </svg>
        </button>
      </th>
      <th class = 'table-head'>
        <button class = 'createdAt'>
          Дата и время создания
          <svg class='tablesvg' width="12" height="26" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.7" clip-path="url(#clip0_121_2332)">
          <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></g>
          <defs><clipPath id="clip0_121_2332"><rect width="12" height="12" fill="white"/></clipPath></defs>
          </svg>
        </button>
      </th>
      <th class = 'table-head'>
        <button class = 'updatedAt'>
          Последние изменения
          <svg class='tablesvg' width="12" height="26" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.7" clip-path="url(#clip0_121_2332)">
          <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></g>
          <defs><clipPath id="clip0_121_2332"><rect width="12" height="12" fill="white"/></clipPath></defs>
          </svg>
        </button>
      </th>
      <th class = 'table-head'>Контакты</th>
      <th class = 'table-head'>Действия</th>
      <th class = 'table-head'></th> 
    </tr>
  </thead>`

  const tableContainer = document.createElement('div');
  tableContainer.classList.add('table-container');
  tableContainer.setAttribute('data-simplebar','')
  main.append(tableContainer);

  const spinner = document.createElement('div');
  spinner.classList.add('spinner-box');
  spinner.innerHTML = `<div class="spinner-border" role="status"></div>`;

  const tBody = document.createElement('tbody');
  tBody.classList.add('tbody')
  table.append(tBody)

  tableContainer.append(table);
  main.append(spinner)

  const data = await getContactsInfo();
  
  spinner.classList.add('hide');

  createRows(data, tBody);

  table.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete')){
      modal('delete', e.target.parentNode.parentNode.id);
    };
    if(e.target.classList.contains('change')){
      modal('change', e.target.parentNode.parentNode.id);
    };
    if(e.target.classList.contains('surname')){
      sorting(e.target, tBody, data, 'surname');
    };
    if(e.target.classList.contains('id')){
      sorting(e.target, tBody, data, 'id');
    };
    if(e.target.classList.contains('createdAt')){
      sorting(e.target, tBody, data, 'createdAt');
    };
    if(e.target.classList.contains('updatedAt')){
      sorting(e.target, tBody, data, 'updatedAt');
    }
  });
  searching(data)
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
   return contacts.map( (el) => {
    return  `<button id='iconbtn' data-info='${el.type} : ${el.value}'><img src ='./img/${el.type}.svg'/></button>`
  }).join(' ')   
}

export function createRows(data, table){

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

    tippy('#iconbtn', {
        content: (reference) => reference.getAttribute('data-info')
    })
  });  
}



