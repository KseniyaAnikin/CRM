import './style.css';
import {el, setChildren} from 'redom';

export const overlay = el('div', { class: 'overlay' });
export const modal = el('div', { class: 'modal' });
const title = el('h2', 'Новый клиент', { class: 'modal-title' });
const form = el('form', { class: 'modal-form' });

const containerLastName = el('div', { class: 'modal-inputcontainer' });
const lastName = el('input', { type: 'text', class: 'modal-input'});
const labelLastName = el('label', 'Фамилия', { class: 'modal__placeholder'}, el('span', '*',{ class: 'pl-span'}));

const containerName = el('div', { class: 'modal-inputcontainer' });
const name = el('input', { type: 'text', class: 'modal-input'});
const labelName = el('label', 'Имя', { class: 'modal__placeholder'}, el('span', '*',{ class: 'pl-span'}));

const containerPatronymic = el('div', { class: 'modal-inputcontainer' });
const patronymic = el('input', { type: 'text', class: 'modal-input'});
const labelPatronymic = el('label', 'Отчество', { class: 'modal__placeholder'});

setChildren(containerPatronymic, [patronymic, labelPatronymic]);
setChildren(containerName, [name,labelName]);
setChildren( containerLastName, [lastName,labelLastName]);
setChildren(form, [title, containerLastName, containerName, containerPatronymic]);

const addContainer = el('div', { class: 'modal-addcontainer'});
const addContactBtn = el('button', 'Добавить контакт', { class: 'modal-addbtn'});

const saveBtn = el('button', 'Сохранить', { class: 'modal-savebtn' });
const cancellationBtn = el('button', 'Отмена' , { class: 'modal-cancel' });
const closeModalBtn = el('button', { class: 'modal-closebtn'})

setChildren(addContainer, addContactBtn);
setChildren(modal, [form, addContainer, saveBtn, cancellationBtn, closeModalBtn]);



