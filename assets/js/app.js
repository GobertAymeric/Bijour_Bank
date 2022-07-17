console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

// * -- Gestion de l'affichage des onglets -- * 

const credit_tab = document.querySelector("#credit_tab");
credit_tab.addEventListener("click", function(){

    let debits = document.getElementsByClassName('debit');
    for (let i = 0; i < debits.length; i++) {
        debits[i].style.display="none"}

    let credits = document.getElementsByClassName('credit');
    for (let i = 0; i < credits.length; i++) {
        credits[i].style.display="contents"}
    
    credit_tab.setAttribute("class", "active");
    all_tab.removeAttribute("class");
    debit_tab.removeAttribute("class");
})

const debit_tab = document.querySelector("#debit_tab");
debit_tab.addEventListener("click", function(){

    let credits = document.getElementsByClassName('credit');
    for (let i = 0; i < credits.length; i++) {
        credits[i].style.display="none"}

    let debits = document.getElementsByClassName('debit');
    for (let i = 0; i < debits.length; i++) {
        debits[i].style.display="contents"}
    
    debit_tab.setAttribute("class", "active");
    all_tab.removeAttribute("class");
    credit_tab.removeAttribute("class");
})

const all_tab = document.querySelector("#all_tab");
all_tab.addEventListener("click",function(){

    let credits = document.getElementsByClassName('credit');
    for (let i = 0; i < credits.length; i++) {
        credits[i].style.display="contents"}

    let debits = document.getElementsByClassName('debit');
    for (let i = 0; i < debits.length; i++) {
        debits[i].style.display="contents"}

        all_tab.setAttribute("class", "active");
        credit_tab.removeAttribute("class");
        debit_tab.removeAttribute("class");
})


const div = document.querySelector("#data");
let solde = document.getElementById("solde");

// * -- Recuperation et formatage du solde en nombre -- * 

const total_value = solde.textContent;
const total_slice = total_value.slice(0, total_value.length - 4);
const total = total_slice.replace(" ", "");
let solde_total = Number(total);

// * -- Recuperation des données via le formulaire -- * 
    
let formulaire = document.getElementById("operationForm");
formulaire.addEventListener("submit", function (e) {
    e.preventDefault();
    const overlay = document.querySelector(".reveal-overlay");
    overlay.style.display = "none";

    let operator = document.querySelector("#operator").value;
    let titre = document.querySelector("#titre").value;
    let desc = document.querySelector("#desc").value;
    let montant = document.querySelector("#montant").value;

    pourcent = Number((montant * 100) / solde_total).toFixed(2);
    let values = [ operator, titre, desc, montant ];
    
    
// * -- Création de variable template ( Merci Adrien <3) -- * 

    const template = `
        <div class="operation ${operator}">
        <div class="grid-x grid-padding-x align-middle">
        <div class="cell shrink">
        <div class="picto"> `;
    const template_credit = `<img src="./assets/images/sac-dargent.png" alt="credit" />`
    const template_debit = `<img src="./assets/images/depenses.png" alt="credit" />`
    const template2 =
        `</div>
        </div>
        <div class="cell auto">
        <div>
        <h2>${titre}</h2>
        <small>${desc}</small>
        </div>
        </div>
        <div class="cell small-3 text-right">
        <div>
        <p class="count">${montant}` + "€" + `</p>
        <small>${pourcent} ` + "%" + `</small>
        </div>
        </div>
        </div>
        </div>`

// * -- Création des nouvelles opérations + calcul du solde -- * 

if(operator == "credit"){
    document.querySelector("#data").innerHTML += template + template_credit + template2;
    solde_total = Number(solde_total) + Number(montant);
    document.querySelector("#solde").innerHTML= solde_total+"€"
    generateData();
}

if(operator == "debit"){
    document.querySelector("#data").innerHTML += template + template_debit + template2;
    solde_total = Number(solde_total) - Number(montant);
    document.querySelector("#solde").innerHTML= solde_total+"€"
    generateData();
}

// * -- Gestion du message de solde -- * 

let sold_text = document.getElementById("sold_text");
if (Number(solde_total) < 100 ){
    sold_text.innerHTML = "On est dans la merde, c'est la déche !" 
    sold_text.style.color="red"
}
else if (Number(solde_total) < 300 ){
    sold_text.innerHTML = "Faut se bouger !" 
    sold_text.style.color="orange"
}

else if (Number(solde_total) < 600 ){
    sold_text.innerHTML = "Ca va, pour l'instant .. " 
    sold_text.style.color="green"
}
else if (Number(solde_total) < 1000 ){
    sold_text.innerHTML = "On est tranquille pour le moment. " 
    sold_text.style.color="green"
}

else {
    sold_text.innerHTML = "On est bien 😀"
    sold_text.style.color="olive"
}


    formulaire.reset();
    refresh();

});

