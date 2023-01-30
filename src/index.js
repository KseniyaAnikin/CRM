import './normalize.css';
import './style.css';
import {el, setChildren, mount} from 'redom';

const header = el('header');
const container = el('div');
const headerInput = el('input',{ type: 'text', placeholder:'Введите запрос' });
headerInput.classList.add('header-input');
container.classList.add('container', 'header-container')
header.classList.add('header');
const addBtn = el('button', 'Добавить клиента');
addBtn.classList.add('add-btn');

setChildren(document.body,[ header, addBtn]);
setChildren(container, headerInput);
setChildren(header,container);



