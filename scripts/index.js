import { modal } from "./modal.js";
import { getContactsInfo } from "./data.js";

const wrapper = document.querySelector('.wrapper');
// const main = document.querySelector('.main');
const container = document.createElement('div');
container.classList.add('container', 'main__container');
// main.classList.add('main');

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
  `<tr>
    <th>ID</th>
    <th>Фамилия Имя Отчество</th>
    <th>Дата и время создания</th>
    <th>Последние изменения</th>
    <th>Контакты</th>
    <th>Действия</th>
  </tr>`

  const spiner = document.createElement('div');
  spiner.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
    </div>
  </div>`

  table.append(spiner)
  

  main.append(table);

  const data = await getContactsInfo();
  data.forEach(element => {
      const row = document.createElement('tr');
      row.classList.add('table-row')
      row.innerHTML = `<th>${element.id}</th>
        <th>${element.surname} ${element.name} ${element.lastName} </th>
        <th>${element.createdAt}</th>
        <th>${element.updatedAt}</th>
        <th>Изменить</th>
        <th>Удалить</th>`
      table.append(row)
    });

}

const createAddButton = (el) => {
  const button = document.createElement('button');
  const buttonContainer = document.createElement('div');

  button.textContent = 'Добавить клиента';
  button.classList.add('main__button');
  button.addEventListener('click', () => {
      modal();
  });

  buttonContainer.classList.add('main__button-container');
  buttonContainer.append(button);
  el.append(buttonContainer);
};

createHeader(wrapper);
createTable(wrapper)
createAddButton(wrapper);

