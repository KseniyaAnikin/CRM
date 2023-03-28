import { getContactsInfo } from './data.js';
import {createRows}  from './index.js';

export async function searching(data){
  
  const search = document.querySelector('.header__search');
  let id;
  let tbody = document.querySelector('.tbody');

  autocomplete({
    input: search,
    fetch: function(text, update) {
      text = text.toLowerCase();
      let suggestions;
      let info = [];
      data.forEach(el => el.contacts.forEach(e => info.push({...e, id: el.id})));
      if(!suggestions){
        suggestions = (data.filter(n => n.surname.toLowerCase().startsWith(text) || n.name.toLowerCase().startsWith(text)));
      }
      
      if(suggestions.length === 0 ) {
        suggestions = info.filter(n => n.value.startsWith(text));
        // suggestions = data.forEach(e => data.filter(el => el.contacts.filter(n => n.value.startsWith(text))) ) ;
        // suggestions = data.filter(n => {
        //   n.contacts.filter(el => {
        //     el.value.startsWith(text)})});
      }

      update(suggestions);
      document.querySelector('.selected').classList.remove('selected');
      const mainDiv = document.querySelector('.autocomplete');
      let options = mainDiv.querySelectorAll('*');

      setTimeout(() => {
        for(let i in suggestions){
          options[i].textContent =  suggestions[i].value || suggestions[i].surname +' '+ suggestions[i].name;
        }  
      }, 300); 
    },
    
    onSelect: async function(item) {
      id = item.id;
      search.value = item.value || item.surname  +' '+ item.name;
      tbody.innerHTML = '';
      
      const data = await getContactsInfo(id);

      createRows([data], tbody);
    }
  });
}


