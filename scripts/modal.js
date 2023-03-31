import { addContactsInfo, deleteContact, getContactsInfo, changeContact} from "./data.js";

export async function modal(mode, idNum) {

  const modal = document.createElement('div');
  modal.classList.add('modal');
  setTimeout(() => {
    modal.classList.add('active');
  }, 300);
  document.querySelector('.wrapper').append(modal);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content');
  modal.append(modalContent);

  const modalAdd = document.createElement('div');
  mode !== 'delete'  ? modalAdd.classList.add('addmodal'): modalAdd.classList.add('hide') ;
  modalContent.append(modalAdd)

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  mode === 'change' ? title.innerHTML = 'Изменить данные': title.innerHTML = 'Новый клиент' ;
  modalAdd.append(title);

  const form = document.createElement('form');
  form.classList.add('modal__form');
  modalAdd.append(form);

  const closeButton = document.createElement('button');
  closeButton.classList.add('modal__close');
  closeButton.addEventListener('click', () => {
    form.reset();
    modal.remove();
  });
  modalContent.append(closeButton);

  const hidePlaceholder = (elem, placeholder) => {
    if (elem.value.length >= 1) {
      placeholder.classList.add('modal__placeholder_active');
    } else {
      placeholder.classList.remove('modal__placeholder_active');
    }
  };

  // surname
  const surName = document.createElement('input');
  const surNameLabel = document.createElement('label');
  surNameLabel.innerHTML = 'Фамилия<span class="symbol">*</span>'
  const surNameBlock = document.createElement('div');
  surName.classList.add('modal__input');
  surNameLabel.classList.add('modal__placeholder');
  surNameBlock.classList.add('modal__input-container');

  surName.addEventListener('blur', () => {
    hidePlaceholder(surName, surNameLabel);
  });

  const spinner = document.createElement('div');
  spinner.classList.add('spinner-box');
  spinner.innerHTML = `<div class="spinner-border" role="status"></div>`;

  form.append(spinner);

  const data = await getContactsInfo(idNum);

  spinner.classList.add('hide');

  if(mode === 'change'){ 
    surName.value = `${data.surname}`;
    surNameLabel.classList.add('modal__placeholder_active');
  }else {surName.value = '';}
  
  surNameBlock.append(surName);
  surNameBlock.append(surNameLabel);
  form.append(surNameBlock);

  // firstname
  const firstName = document.createElement('input');
  const firstNameLabel = document.createElement('label');
  const firstNameBlock = document.createElement('div');
  firstNameLabel.innerHTML = 'Имя<span class="symbol">*</span>';
  firstName.classList.add('modal__input');
  firstNameLabel.classList.add('modal__placeholder');
  firstNameBlock.classList.add('modal__input-container');
  if(mode === 'change'){ 
    firstName.value = `${data.name}`
    firstNameLabel.classList.add('modal__placeholder_active');
  }else {surName.value = '';}
  firstNameBlock.append(firstName);
  firstNameBlock.append(firstNameLabel);
  form.append(firstNameBlock);

  firstName.addEventListener('blur', () => {
    hidePlaceholder(firstName, firstNameLabel);
  });

  // patronymic
  const patronymic = document.createElement('input');
  const patronymicLabel = document.createElement('label');
  const patronymicBlock = document.createElement('div');
  patronymicLabel.innerHTML = 'Отчество'
  patronymic.classList.add('modal__input');
  patronymicLabel.classList.add('modal__placeholder');
  patronymicBlock.classList.add('modal__input-container');
  if(mode === 'change'){ 
    patronymic.value = `${data.lastName}`;
    patronymicLabel.classList.add('modal__placeholder_active');
  }else {surName.value = '';}
  patronymicBlock.append(patronymic);
  patronymicBlock.append(patronymicLabel);
  form.append(patronymicBlock);

  patronymic.addEventListener('blur', () => {
    hidePlaceholder(patronymic, patronymicLabel);
  });

  //add
  const contactBlock = document.createElement('div');
  contactBlock.classList.add('modal__contacts', 'modal-contacts');
  form.append(contactBlock);

  const addContactButton = document.createElement('button');
  addContactButton.classList.add('modal__add-contact');
  addContactButton.setAttribute('type', 'button');
  addContactButton.textContent = 'Добавить контакт';
  
  addContactButton.addEventListener('click', () => {
    let contacts = document.querySelectorAll('.modal-contacts__input');
    createContact(contactBlock, addContactButton, '');
    if(contacts.length > 8)
      addContactButton.classList.add('hide');
  });
  contactBlock.append(addContactButton);

  const errorBlock = document.createElement('div');
  errorBlock.classList.add('modal__error-block');
  form.append(errorBlock);

  const inputs = document.querySelectorAll('input');
  inputs.forEach(e => {
    e.addEventListener('focus', ()=>{
      e.classList.remove('modal__input_error')
    })
  })

  //save
  const saveButton = document.createElement('button');
  saveButton.classList.add('modal__submit');
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Сохранить';
  saveButton.setAttribute('type', 'button');
  form.append(saveButton);
  saveButton.addEventListener('click', ()=>{
    let newContact = {
      name: firstName.value,
      surname: surName.value,
      lastName: patronymic.value,
      contacts: addCont(),
    }

    const inputs = document.querySelectorAll('.modal-contacts__input');
    inputs.forEach(e => {
      e.addEventListener('focus', ()=>{
        e.classList.remove('modal-contacts__input-error')
      })
    })

    if(validator.isEmpty(newContact.name, { ignore_whitespace: true })){
      const error = document.createElement('p');
      error.classList.add('modal__error')
      error.innerHTML = `Вы не заоплнили имя`;
      errorBlock.append(error)
      firstName.classList.add('modal__input_error');  
      document.querySelector('.spinner-border-sm').classList.add('hide');
    } 
    if(validator.isEmpty(newContact.surname, { ignore_whitespace: true })){
      const error = document.createElement('p');
      error.classList.add('modal__error')
      error.innerHTML = `Вы не заоплнили фамилию`;
      errorBlock.append(error)
      surName.classList.add('modal__input_error');
      document.querySelector('.spinner-border-sm').classList.add('hide');
    }
    if(checkCont(inputs, errorBlock)){
      console.log('пустой контакт')
    }
    else{
      document.querySelector('.spinner-border-sm').classList.remove('hide');
      mode === 'add' ? addContactsInfo(newContact) : changeContact(newContact, data.id);
    }

  })

  //DELETE MODE
  const modalDelete = document.createElement('div');
  mode === 'delete' ? modalDelete.classList.add('deletemodal'): modalDelete.classList.add('hide') ;
  modalContent.append(modalDelete)

  const subtitle = document.createElement('h3');
  subtitle.classList.add('modal-subtitle')
  subtitle.innerHTML = 'Удалить клиента';
  modalDelete.append(subtitle);

  const deletWarning = document.createElement('p');
  deletWarning.innerText = 'Вы действительно хотите удалить данного клиента?';
  deletWarning.classList.add('modal__text')
  modalDelete.append(deletWarning);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('modal__delete', 'modal__submit');
  deleteButton.innerHTML =`Удалить`

  deleteButton.setAttribute('type', 'button');
  modalDelete.append(deleteButton);

  deleteButton.addEventListener('click', ()=>{
    deleteButton.innerHTML =`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Удалить`
    deleteContact(idNum);
  })

  //cancell
  const cancelButton = document.createElement('button');
  cancelButton.classList.add('modal__cancel');
  cancelButton.textContent = 'Отмена';
  modalContent.append(cancelButton);

  if(mode ==='change'){
    console.log(data.contacts)
    data.contacts.map(item => { createContact(contactBlock, addContactButton, item) })
  }
}

function createContact(block, button, user){

  const SELECT_TYPE = {
    tel: 'Телефон',
    extratel: 'Доп.телефон',
    email: 'Email',
    vk: 'Vk',
    facebook: 'Facebook',
  };

  const contactBlock = document.createElement('div');
  contactBlock.classList.add('modal-contacts__item');
  button.before(contactBlock);

  const select = document.createElement('select');
  const choices = (el) => {
    new Choices(el, {
      shouldSort: false,
      searchEnabled: false,
      itemSelectText: "",
      choices: [
        {
          value: user.type || SELECT_TYPE.tel,
          label: user.type || SELECT_TYPE.tel,
          // placeholder: true,
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
  user.value ? input.value = user.value : input.placeholder = 'Введите данные контакта';

  const cancel = document.createElement('button');
  cancel.setAttribute('type', 'button');
  cancel.classList.add('modal-contacts__cancel');

  block.classList.add('modal__contacts_active');

  contactBlock.append(select);
  contactBlock.append(input);
  contactBlock.append(cancel);

  cancel.addEventListener('click', ()=>{
    cancel.parentNode.classList.add('hide');
    cancel.parentNode.innerHTML= '';
    let contacts = document.querySelectorAll('.modal-contacts__input');
    if(contacts.length <= 9)
      document.querySelector('.modal__add-contact').classList.remove('hide');
  })

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

function checkCont(arr, errorBlock){
  let _isEmpty = false;
  arr.forEach(el =>{
    if(validator.isEmpty(el.value, { ignore_whitespace: true })){
      const error = document.createElement('p');
      error.classList.add('modal__error')
      error.innerHTML = `Вы не заоплнили контакт`;
      errorBlock.append(error)
      el.classList.add('modal-contacts__input-error');
      _isEmpty=true;
      document.querySelector('.spinner-border-sm').classList.add('hide');
    }
  })
  if( _isEmpty === true) return true;
}

 
