import { createRows } from "./index.js";

function sortUp(arr, key ){

  let sortedList = arr.slice();

  sortedList.sort((el1, el2)=> {
    if (el1[key] < el2[key]) {return -1;} 
  });
  
  return sortedList
}

function sortDown(arr, key ){

  let sortedList = arr.slice();

  sortedList.sort((el1, el2)=> {
    if (el1[key] > el2[key]) {return -1;} 
  });
  
  return sortedList
}

export function sorting(el, tBody, data, key ){
  
  if(el.classList.contains(key)){

    if(el.lastElementChild.classList.contains('tablesvg-up')){
      clear(tBody);
      createRows(sortDown(data, key), tBody);
      el.lastElementChild.classList.remove('tablesvg-up');
      
    } else {
      clear(tBody);
      el.lastElementChild.classList.add('tablesvg-up');
      createRows(sortUp(data, key), tBody);
    }
  };
}

function clear(element){
  element.innerHTML = '';
}
  