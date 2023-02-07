const wrapper = document.querySelector('.wrapper');
const main = document.querySelector('.main');
const container = document.createElement('div');
container.classList.add('container', 'main__container');
main.classList.add('main');

const createHeader = (el) =>{
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

const createAddButton = (el) => {
  const button = document.createElement('button');
  const buttonContainer = document.createElement('div');

  button.textContent = 'Добавить клиента';
  button.classList.add('main__button');
  // button.addEventListener('click', () => {
  //   mainModal();
  // });

  buttonContainer.classList.add('main__button-container');
  buttonContainer.append(button);
  el.append(buttonContainer);
};

createHeader(wrapper);
createAddButton(wrapper);