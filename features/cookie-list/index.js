const form = document.getElementById("form");
const tbody = document.getElementById("tbody");

function handlerSubmit(e) {
  e.preventDefault();

  document.cookie = `${form.name.value}=${form.value.value};`;
  console.log(document.cookie);

  addRows();
}

function addRows() {
  const fragment = document.createDocumentFragment();
  const cookiesList = parceCookies();

  for (let i = 0; i < cookiesList.length; i++) {
    const newRow = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = cookiesList[i].key;
    newRow.appendChild(nameCell);

    const valueCell = document.createElement("td");
    valueCell.textContent = cookiesList[i].value;
    newRow.appendChild(valueCell);

    const actionCell = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = "remove";
    actionCell.appendChild(button);
    button.addEventListener("click", () => {
      console.log(cookiesList[i].key);

      deleteCookie(cookiesList[i].key);
    });
    newRow.appendChild(actionCell);

    fragment.appendChild(newRow);
  }

  tbody.replaceChildren(fragment);
}

form.addEventListener("submit", handlerSubmit);

function parceCookies() {
  const cookieArrObj = [];

  document.cookie.split(";").forEach((cook) => {
    const arr = cook.trim().split("=");
    const cookieObj = { key: arr[0], value: arr[1] };

    cookieArrObj.push(cookieObj);
  });

  return cookieArrObj;
}

function deleteCookie(name) {
  //   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = name + "=; max-age=0;";
  addRows();
}

window.addEventListener("load", () => {
  addRows();
});
