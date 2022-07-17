const tout = document.querySelector("#tout");
const credit = document.querySelector("#credit");
const debit = document.querySelector("#debit");
const main = document.querySelector("#main");
const op_debit = main.querySelectorAll("div.operation.debit");
const op_credit = main.querySelectorAll("div.operation.credit");

function active() {
    credit.addEventListener("click", () => {
        credit.classList.add("active");
        credit.classList.add("fade-in-fwd");
        main.classList.add("fade-in-fwd");
        op_debit.forEach(element => {
            element.style.display = "none"
        });
        op_credit.forEach(element => {
            element.style.display = ""
        });
        credit.addEventListener("animationend", () => {
            credit.classList.remove("fade-in-fwd");
            main.classList.remove("fade-in-fwd");
        });
        if(credit.classList.contains("active")){
            tout.classList.remove("active");
            debit.classList.remove("active");
        }
    })
    debit.addEventListener("click", () => {
        debit.classList.add("active");
        debit.classList.add("fade-in-right");
        main.classList.add("fade-in-right");
        op_credit.forEach(element => {
            element.style.display = "none"
        });
        op_debit.forEach(element => {
            element.style.display = ""
        });
        debit.addEventListener("animationend", () => {
            debit.classList.remove("fade-in-right");
            main.classList.remove("fade-in-right");
        });
        if(debit.classList.contains("active")){
            tout.classList.remove("active");
            credit.classList.remove("active");
        }
    })
    tout.addEventListener("click", () => {
        tout.classList.add("active");
        tout.classList.add("fade-in-left");
        main.classList.add("fade-in-left");
        op_credit.forEach(element => {
            element.style.display = "";
        });
        op_debit.forEach(value => {
            value.style.display = "";
        });
        tout.addEventListener("animationend", () => {
            tout.classList.remove("fade-in-left");
            main.classList.remove("fade-in-left");
        });
        if(tout.classList.contains("active")){
            main.style.display = "";
            debit.classList.remove("active");
            credit.classList.remove("active");
        }
    })
}
active();


const operator = document.querySelector("#operator");
const titre = document.querySelector("#titre");
const desc = document.querySelector("#desc");
const montant = document.querySelector("#montant");
const solde = document.querySelector("#solde");
const form = document.querySelector("#operationForm");
const overlay = document.querySelector(".reveal-overlay");
const small = document.querySelector(".good");


const operations = []
const div = document.querySelector("#data");

function render() {
    operations.forEach( (operation) => {
        const template = `
        <div class="operation ${operation.type}">
        <div class="grid-x grid-padding-x align-middle">
        <div class="cell shrink">
        <div class="picto">
        `;
        const template_credit = `<img src="./assets/images/sac-dargent.png" alt="credit" />`
        const template_debit = `<img src="./assets/images/depenses.png" alt="credit" />`
        const template2 =
        `</div>
        </div>
        <div class="cell auto">
        <div>
        <h2>${operation.titre}</h2>
        <small>${operation.desc}</small>
        </div>
        </div>
        <div class="cell small-3 text-right">
        <div>
        <p class="count">${operation.montant}` + "€" + `</p>
        <small>${operation.percent}` + "%" + `</small>
        </div>
        </div>
        </div>
        </div>`

        if(operation.type === "credit"){
            document.querySelector("#data").innerHTML += template + template_credit + template2;
        }
        if(operation.type === "debit"){
            document.querySelector("#data").innerHTML += template + template_debit + template2;
        }
    })
}


// à la solution du formulaire
function filter(type) {
    const filter = operations.filter((operation) => operation.type === type);
}

credit.addEventListener("click", () => {
    const doc = document.querySelectorAll("#data > div");
    doc.forEach( document => {
        if(document.classList.contains("credit")){
            document.classList.add("fade-in-fwd");
            document.style.display = "";
            document.addEventListener("animationend", () => {
                document.classList.remove("fade-in-fwd");
            })
        }else{
            document.style.display = "none";
        }
    })
    filter("credit");
})
debit.addEventListener("click", () => {
    const doc = document.querySelectorAll("#data > div");
    doc.forEach( document => {
        if(document.classList.contains("debit")){
            document.classList.add("fade-in-right");
            document.addEventListener("animationend", () => {
                document.classList.remove("fade-in-right");
            })
            document.style.display = "";
        }else{
            document.style.display = "none";
        }
    })
    filter("debit");
})
tout.addEventListener("click", () => {
    const doc = document.querySelectorAll("#data > div");
    doc.forEach( document => {
        document.classList.add("fade-in-left");
        document.addEventListener("animationend", () => {
            document.classList.remove("fade-in-left");
        })
        document.style.display = "";
    })
    filter("debit");
})

function data_anim() {
    div.classList.add("fade-in-left");
    div.addEventListener("animationend", () => {
        div.classList.remove("fade-in-left");
    })
}

const total_value = solde.textContent;
const total_slice = total_value.slice(0, total_value.length - 4);
const total = total_slice.replace(" ", "");
let argent = Number(total);

function formulaire(){
    form.addEventListener("submit", (e) => {
        e.preventDefault;
        const overlay = document.querySelector(".reveal-overlay");
        overlay.style.display = "none";
        const new_operations = {
            titre: titre.value,
            desc: desc.value,
            montant: montant.value,
            percent: Number((montant.value * 100) / argent).toFixed(2),
            type: operator.value
        }
        if(operator.value === "credit"){
            argent = argent + Number(montant.value);
        };
        if(operator.value === "debit"){
            argent = argent - Number(montant.value);
        };
        if(argent > 1000){
            small.textContent = "tu peux te permettre de faire des dépenses 😆";
        }else{
            small.textContent = "C'est la fin ...☠️";
        }
        solde.textContent = Number(argent).toFixed(2) + "€";
        operations.push(new_operations);
        data_anim();
        operator.value = "--";
        titre.value = "";
        desc.value = "";
        montant.value = "";
        render();
        generateData();
        localStorage.setItem("titre", new_operations.titre)
        localStorage.setItem("desc", new_operations.desc)
        localStorage.setItem("montant", new_operations.montant)
        localStorage.setItem("percent", new_operations.percent)
        localStorage.setItem("type", new_operations.type)
        operations.pop()
    })
}
formulaire();

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.type === "credit"){
        localStorage.percent = Number((localStorage.montant * 100) / argent).toFixed(2);
        argent = argent + Number(localStorage.montant);
    };
    if(localStorage.type === "debit"){
        localStorage.percent = Number((localStorage.montant * 100) / argent).toFixed(2);
        argent = argent - Number(localStorage.montant);
    };
    if(argent > 1000){
        small.textContent = "tu peux te permettre de faire des dépenses 😆";
    }else{
        small.textContent = "C'est la fin ...☠️";
    }
    solde.textContent = Number(argent).toFixed(2) + "€";
    operations.push(localStorage);
    render();
    generateData();
    operations.pop();

})

const conversion = document.querySelector("#conversion")

conversion.addEventListener("click", () => {
    if(conversion.textContent === "Conversion en $"){
        solde.classList.add("fade-in-fwd")
        conversion.textContent = "Conversion en €";
        solde.textContent = (argent * 1.05).toFixed(2) + "$"
    }
    else{
        solde.classList.add("fade-in-fwd")
        conversion.textContent = "Conversion en $";
        solde.textContent = argent.toFixed(2) + "€"
    }
    solde.addEventListener("animationend", () => {
        solde.classList.remove("fade-in-fwd")
    })
})