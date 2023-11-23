export function sortAscending(basedOn, filteredList, setFilteredList) {
  const arr = filteredList;
  arr.sort((a, b) => {
    const nameA = a[basedOn].toUpperCase();
    const nameB = b[basedOn].toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
  setFilteredList(arr);
}

export function sortDescending(basedOn, filteredList, setFilteredList) {
  const arr = filteredList;
  arr.sort((a, b) => {
    const nameA = a[basedOn].toUpperCase();
    const nameB = b[basedOn].toUpperCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }

    return 0;
  });
  setFilteredList(arr);
}
