import './normalize.css';
import './style.css';
import {el, setChildren, mount} from 'redom';
import { overlay, modal} from './modal.js';

const header = el('header');
const container = el('div');
const headerInput = el('input',{ type: 'text', placeholder:'Введите запрос' });
headerInput.classList.add('header-input');
container.classList.add('container', 'header-container')
header.classList.add('header');
const addBtn = el('button', 'Добавить клиента');
addBtn.classList.add('add-btn');

setChildren(container, headerInput);
setChildren(header,container);

setChildren(document.body,[ header, addBtn, overlay, modal]);

addBtn.addEventListener('click', ()=> {
  overlay.classList.add('active');
  modal.classList.add('active');
  console.log('DONE')
})




