export function modal() {

  const modal = document.createElement('div');
  const modalContent = document.createElement('div');
  const title = document.createElement('h2');
  const form = document.createElement('form');

  const firstName = document.createElement('input');
  const firstNameLabel = document.createElement('label');
  const firstNameBlock = document.createElement('div');

  const surName = document.createElement('input');
  const surNameLabel = document.createElement('label');
  const surNameBlock = document.createElement('div');

  const lastName = document.createElement('input');
  const lastNameLabel = document.createElement('label');
  const lastNameBlock = document.createElement('div');

  const contactBlock = document.createElement('div');
  const addContactButton = document.createElement('button');
  const saveButton = document.createElement('button');
  const cancelButton = document.createElement('button');
  const closeButton = document.createElement('button');

  

  
 

  modal.classList.add('modal');
  setTimeout(() => {
    modal.classList.add('active');
  }, 300);
  modal.addEventListener('click', (e) => {
    if (e._isClickWithimModal) { return; }
    modal.remove();
  });

  modalContent.classList.add('modal__content');
  modalContent.append(title);
  modalContent.append(closeButton);
  modalContent.dataset.simplebar = true;

  contactBlock.classList.add('modal__contacts', 'modal-contacts');
  contactBlock.append(addContactButton);

  form.classList.add('modal__form', 'modal-form');
  form.append(surNameBlock);
  form.append(firstNameBlock);
  form.append(lastNameBlock);
  form.append(contactBlock);
  form.append(saveButton);
  form.append(cancelButton);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    saveButton.classList.toggle('modal__submit_loading');
    const errors = form.querySelector('.modal__error-block');

    if (errors) {
      errors.textContent = '';
    }

    if (!validateField(form)) {
      saveButton.classList.toggle('modal__submit_loading');
      return;
    }

    if (type === TYPE.new) {    // Если создаем нового пользователя
      const data = await dataServer.addUserToServer({
        name: firstName.value,
        surname: surName.value,
        lastName: lastName.value,
        contacts: getContacts(contactBlock),
      });

      if (data.errors) {
        for (const error of data.errors) {
          const er = document.createElement('div');
          er.classList.add('modal__error');
          er.textContent = error.message;
          errors.append(er);
        }
        saveButton.before(errors);
        return;
      }
    } else if (type === TYPE.change) {    //Если изменяем существующего пользователя
      const data = await dataServer.updateUserToServer(user.id, {
        name: firstName.value,
        surname: surName.value,
        lastName: lastName.value,
        contacts: getContacts(contactBlock),
      });

      if (data.message) {
        saveButton.before(data.message);
        return;
      }
    }

    form.reset();

    saveButton.classList.toggle('modal__submit_loading');

    firstNameLabel.removeAttribute('style');
    surNameLabel.removeAttribute('style');
    lastNameLabel.removeAttribute('style');
    modal.classList.remove('active');
    createTableBody();
  });

  modalContent.append(form);
  modalContent.addEventListener('click', (e) => {
    e._isClickWithimModal = true;
  });

  // surname
  surName.classList.add('modal__input');
  surName.value = user.surname || '';
  surName.autocomplete = 'off';
  surName.id = 'surName';
  surName.addEventListener('blur', () => {
    hidePlaceholder(surName, surNameLabel);
  });

  surNameLabel.classList.add('modal__placeholder');
  surNameLabel.innerHTML = 'Фамилия<span class="symbol">*</span>';
  surNameLabel.setAttribute('for', 'surName');

  surNameBlock.append(surName);
  surNameBlock.append(surNameLabel);
  surNameBlock.classList.add('modal__input-container');

  // firstname
  firstName.classList.add('modal__input');
  firstName.value = user.name || '';
  firstName.autocomplete = 'off';
  firstName.id = 'firstName';
  firstName.addEventListener('blur', () => {
    hidePlaceholder(firstName, firstNameLabel);
  });

  firstNameLabel.classList.add('modal__placeholder');
  firstNameLabel.innerHTML = 'Имя<span class="symbol">*</span>';
  firstNameLabel.setAttribute('for', 'firstName');

  firstNameBlock.append(firstName);
  firstNameBlock.append(firstNameLabel);
  firstNameBlock.classList.add('modal__input-container');

  // lastname
  lastName.classList.add('modal__input');
  lastName.value = user.lastName || '';
  lastName.autocomplete = 'off';
  lastName.id = 'lastName';
  lastName.addEventListener('blur', () => {
    hidePlaceholder(lastName, lastNameLabel);
  });

  lastNameLabel.classList.add('modal__placeholder');
  lastNameLabel.innerHTML = 'Отчество';
  lastNameLabel.setAttribute('for', 'lastName');

  lastNameBlock.append(lastName);
  lastNameBlock.append(lastNameLabel);
  lastNameBlock.classList.add('modal__input-container');

  hidePlaceholder(surName, surNameLabel);
  hidePlaceholder(firstName, firstNameLabel);
  hidePlaceholder(lastName, lastNameLabel);

  title.innerHTML = type === TYPE.new
    ? 'Новый клиент' : `Изменить данные <span class='modal-title__id'>ID: ${user.id}</span>`;
  title.classList.add('modal__title');

  if (user.contacts) {
    for (const contact of user.contacts) {
      addContact(contactBlock, addContactButton, contact);
    }
  }

  addContactButton.classList.add('modal__add-contact');
  addContactButton.dataset.index = contactBlock.childNodes.length - 1;
  addContactButton.textContent = 'Добавить контакт';
  addContactButton.addEventListener('click', (e) => {
    const index = addContactButton.dataset.index;
    addContactButton.dataset.index = Number(index) + 1;
    e.preventDefault();
    addContact(contactBlock, addContactButton);
    if (index >= 9) {
      addContactButton.style.display = 'none';
    }
  });

  closeButton.classList.add('modal__close');
  closeButton.addEventListener('click', () => {
    form.reset();
    modal.remove();
  });

  saveButton.textContent = 'Сохранить';
  saveButton.type = 'submit';
  saveButton.classList.add('modal__submit');

  cancelButton.textContent = type === TYPE.new ? 'Отмена' : 'Удалить клиента';
  cancelButton.classList.add('modal__cancel');

  cancelButton.addEventListener('click', (e) => {
    if (type === TYPE.change) {
      deleteUser(user.id);
    }
    e.preventDefault();
    modal.remove();
  });

  modal.append(modalContent);
  document.querySelector('.wrapper').append(modal);
}