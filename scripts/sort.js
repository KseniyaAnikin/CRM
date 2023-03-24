export function sortUp(arr, key ){

  let sortedList = arr.slice();

  sortedList.sort((el1, el2)=> {
    if (el1[key] < el2[key]) {return -1;} 
  });
  
  return sortedList
}

export function sortDown(arr, key ){

  let sortedList = arr.slice();

  sortedList.sort((el1, el2)=> {
    if (el1[key] > el2[key]) {return -1;} 
  });
  
  return sortedList
}
