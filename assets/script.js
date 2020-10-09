const pathName = window.location.pathname;

if (pathName === "/" || pathName === "/index.html" || pathName === "/curso_bootstrap/") {
  window.location = "./grid-system.html";
}

// var url = 'https://api.sheety.co/97717c63f8de6e1e58e42fca477f2c78/itemsMenu/menu'
var url = 'assets/data/menu.json'
// URL API

var xhttp = new XMLHttpRequest();

xhttp.open('GET', url, true)
xhttp.onreadystatechange = function () {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    var res = xhttp.responseText
    renderMenu(res);
  }
}
xhttp.send();

function renderMenu(res) {
  const menu = JSON.parse(res).menu;
  const elUl = document.querySelector('.render');
  const render = menu.map(item => {

    let list = renderItems(item);
    elUl.appendChild(list);
  });
}

function renderItems(item) {

  const elLi = document.createElement('li');
  const elA = document.createElement('a');
  elA.setAttribute('href', item.path);
  elA.innerHTML = item.name;
  elLi.appendChild(elA);

  if (item.childrens) {
    const elSubUl = document.createElement('ul');
      item.childrens.map(subitem => {
        let sublist = renderItems(subitem);
          elSubUl.appendChild(sublist);
      });
      elLi.appendChild(elSubUl);
  }
  return elLi;
}

$(() => {
  $('#btn-close-all').on('click', e => {
    $('.alert').fadeOut();
  });
});