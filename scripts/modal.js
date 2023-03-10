import { addContactsInfo } from "./data.js";

export function modal() {

  const modal = document.createElement('div');
  modal.classList.add('modal');
  setTimeout(() => {
    modal.classList.add('active');
  }, 300);
  document.querySelector('.wrapper').append(modal);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content');
  modal.append(modalContent);

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.innerHTML = 'Новый клиент';
  modalContent.append(title);

  const form = document.createElement('form');
  form.classList.add('modal__form', 'modal-form');
  modalContent.append(form);

  const closeButton = document.createElement('button');
  closeButton.classList.add('modal__close');
  closeButton.addEventListener('click', () => {
    // e.preventDefault();
    form.reset();
    modal.remove();
  });
  modalContent.append(closeButton);

  // surname
  const surName = document.createElement('input');
  const surNameLabel = document.createElement('label');
  const surNameBlock = document.createElement('div');
  surName.classList.add('modal__input');
  surNameLabel.classList.add('modal__placeholder');
  surNameBlock.classList.add('modal__input-container');
  surNameLabel.innerHTML = 'Фамилия<span class="symbol">*</span>';
  surNameBlock.append(surName);
  surNameBlock.append(surNameLabel);
  form.append(surNameBlock);

  // firstname
  const firstName = document.createElement('input');
  const firstNameLabel = document.createElement('label');
  const firstNameBlock = document.createElement('div');
  firstName.classList.add('modal__input');
  firstNameLabel.classList.add('modal__placeholder');
  firstNameBlock.classList.add('modal__input-container');
  firstNameLabel.innerHTML = 'Имя<span class="symbol">*</span>';
  firstNameBlock.append(firstName);
  firstNameBlock.append(firstNameLabel);
  form.append(firstNameBlock);

  // patronymic
  const patronymic = document.createElement('input');
  const patronymicLabel = document.createElement('label');
  const patronymicBlock = document.createElement('div');
  patronymic.classList.add('modal__input');
  patronymicLabel.classList.add('modal__placeholder');
  patronymicBlock.classList.add('modal__input-container');
  patronymicLabel.innerHTML = 'Отчество';
  patronymicBlock.append(patronymic);
  patronymicBlock.append(patronymicLabel);
  form.append(patronymicBlock);

  //add
  const contactBlock = document.createElement('div');
  contactBlock.classList.add('modal__contacts', 'modal-contacts');
  form.append(contactBlock);

  const addContactButton = document.createElement('button');
  addContactButton.classList.add('modal__add-contact');
  addContactButton.setAttribute('type', 'button');
  addContactButton.textContent = 'Добавить контакт';
  addContactButton.addEventListener('click', () => {
    createContact(contactBlock, addContactButton);
  });
  contactBlock.append(addContactButton);

  //save
  const saveButton = document.createElement('button');
  saveButton.classList.add('modal__submit');
  saveButton.textContent = 'Сохранить';
  saveButton.setAttribute('type', 'button');
  form.append(saveButton);
  saveButton.addEventListener('click', ()=>{
    let newContact = {
      name: firstName.value,
      surname: surName.value,
      lastName: patronymic.value,
      contacts: addCont(),

    }
     addContactsInfo(newContact)
    // console.log(addCont())
  })

  //cancell
  const cancelButton = document.createElement('button');
  cancelButton.classList.add('modal__cancel');
  cancelButton.textContent = 'Отмена';
  form.append(cancelButton);

}

const SELECT_TYPE = {
  tel: 'Телефон',
  extratel: 'Доп.телефон',
  email: 'Email',
  vk: 'Vk',
  facebook: 'Facebook',
};

function createContact(block, button){

  const contactBlock = document.createElement('div');
  contactBlock.classList.add('modal-contacts__item');
  button.before(contactBlock);

  // select
  const select = document.createElement('select');
  const choices = (el) => {
    new Choices(el, {
      shouldSort: false,
      searchEnabled: false,
      itemSelectText: "",
      choices: [
        {
          value: SELECT_TYPE.tel,
          label: SELECT_TYPE.tel,
          placeholder: true,
          selected: true,
          disabled: false,
        },
        {
          value: SELECT_TYPE.extratel,
          label: SELECT_TYPE.extratel,
          selected: false,
          disabled: false,
        },
        {
          value: SELECT_TYPE.email,
          label: SELECT_TYPE.email,
          selected: false,
          disabled: false,
        },
        {
          value: SELECT_TYPE.vk,
          label: SELECT_TYPE.vk,
          selected: false,
          disabled: false,
        },
        {
          value: SELECT_TYPE.facebook,
          label: SELECT_TYPE.facebook,
          selected: false,
          disabled: false,
        },
      ],
    })
  };
  
  const input = document.createElement('input');
  input.classList.add('modal-contacts__input');
  input.placeholder = 'Введите данные контакта';
 
  const cancel = document.createElement('button');
  cancel.classList.add('modal-contacts__cancel');

  block.classList.add('modal__contacts_active');

  contactBlock.append(select);
  contactBlock.append(input);
  contactBlock.append(cancel);

  choices(select);

}

function addCont(){
  let itemsCont = document.querySelectorAll('.modal-contacts__item');
  let allCont = [];

  itemsCont.forEach(item => {

    let select = item.querySelector('select');
    let input = item.querySelector('input');
    let cont = {type: select.value, value: input.value};
    allCont.push(cont)
  })

  return allCont;
}

