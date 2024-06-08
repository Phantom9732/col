let form = document.forms.cardinfo;
//логотип
let inBank = form.inbank
let outBank = document.querySelector('.logo');
inBank.onchange = function() {
    let logoUrl;
    switch (inBank.value) {
        case "Сбербанк":
            logoUrl = "logo/sber.png";
            break;
        case "Альфабанк":
            logoUrl = "logo/alfa.png";
            break;
     case "Тинькофф":
            logoUrl = "logo/tinkoff.png";
            break;
        case "Газпромбанк":
            logoUrl = "logo/gpb.png";
            break;
        case "ВТБ":
            logoUrl = "logo/vtb.png";
            break;
    }
    outBank.style.backgroundImage = `url(${logoUrl})`;
  };

  //Логотип платежнйо системы
let inIssuer = form.inissuer
let outIssuer = document.querySelector('.pslogo');
inIssuer.onchange = function() {
    let logoUrl;
    switch (inIssuer.value) {
        case "MasterCard":
            logoUrl = "logo/Mastercard.png";
            break;
        case "Visa":
            logoUrl = "logo/visa.png";
            break;
        case "Мир":
            logoUrl = "logo/mir.png";
            break;
    }
    outIssuer.style.backgroundImage = `url(${logoUrl})`;
  };

  //Номер карты
let inNumber = form.innumber;
let outNumber = document.querySelector('.number');
inNumber.oninput = function() {
    outNumber.innerHTML = inNumber.value;
};
//Срок действия
let inValid = form.invalid;
let outValid = document.querySelector('.valid');
inValid.oninput = function() {
    outValid.innerHTML = inValid.value;
};
//Имя держателя карты
let inCardholder = form.incardholder;
let outCardholder = document.querySelector('.cardholder');
inCardholder.oninput = function() {
    outCardholder.innerHTML = inCardholder.value;
};

//кнопка и таблица
let table = document.querySelector('.ctable');
var body = table.getElementsByTagName('tbody')[0];

form.addEventListener("submit", function(e) {
	e.preventDefault();
    let row = document.createElement("tr");
    for (i = 0; i < form.length - 1; i++) {
        let cell = document.createElement("td");
        cell.className = "cell"
        let CellText = document.createTextNode(form.elements[i].value);
        cell.appendChild(CellText)
        row.appendChild(cell)
        body.appendChild(row)
        console.log(form.elements[i].name)
    }
    form.reset();
    outBank.style.backgroundImage = null;
    outIssuer.style.backgroundImage = null;
    outNumber.innerHTML = "";
    outValid.innerHTML = "";
    outCardholder.innerHTML = "";
});

