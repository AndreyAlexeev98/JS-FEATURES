const form = document.getElementById("form");
const tbody = document.getElementById("tbody");
const filter = document.getElementById("filter");

function handlerSubmit(e) {
  e.preventDefault();

  document.cookie = `${form.name.value}=${form.value.value};`;

  addRows();
}

function addRows(cookieToRender) {
  const fragment = document.createDocumentFragment();
  const cookiesList = cookieToRender || parceCookies();

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

function deleteCookie(name) {
  //   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = name + "=; max-age=0;";
  addRows();
}

window.addEventListener("load", () => {
  addRows();
});

filter;

// В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение.

// Если в поле фильтра пусто, то должны выводиться все доступные cookie
// Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
// Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру, то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
