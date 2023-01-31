import './style.css';
import {el, setChildren} from 'redom';

export const overlay = el('div');
overlay.classList.add('overlay');
export const modal = el('div');
modal.classList.add('modal');

const title = el('h2', 'Изменить данные');
title.classList.add('modal-title');

const form = el('form');
form.classList.add('modal-form');
const lastName = el('input', { type: 'text'});
lastName.classList.add('modal-input');
const firstName = el('input', { type: 'text'});
firstName.classList.add('modal-input')
const patronymic = el('input', { type: 'text'});
patronymic.classList.add('modal-input')


setChildren(form, [ title, lastName, firstName, patronymic])
setChildren(modal, form)



