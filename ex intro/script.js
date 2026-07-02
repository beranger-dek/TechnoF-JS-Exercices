//ex0
const input1 = document.getElementById('nom');
const input2 = document.getElementById('age');
const bonjour = document.getElementById('bonjour');
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    const name = input1.value;
    const age = input2.value;
    
    if (!name || !age) {
        bonjour.textContent = 'Veuillez remplir tout les champs';
        return;
    }

    bonjour.textContent = `Bonjour je m'appelle ${name} et j'ai ${age} an(s).`;
});

//ex1
const inputTaille = document.getElementById("height");
const inputPoids = document.getElementById("weight");

const BMI_res = document.getElementById("bmi-results");
const button2 = document.getElementById("btn2");

button2.addEventListener('click', () => {
    const taille = inputTaille.valueAsNumber;
    const poids = inputPoids.valueAsNumber;

    if (!taille || !poids) {
    bonjour.textContent = 'Veuillez remplir tout les champs';
    return;
    }
    let IMC = poids / (taille/100) ** 2;
    IMC = IMC.toFixed(2);
    const answ = IMC < 18.5 ? "Maigreur" :
    IMC < 24.9 ? "Corpulence normale" :
    IMC < 29.9 ? "Surpoids" :
    "Obésité";
    BMI_res.innerHTML = `Résultat : <br>
    Votre IMC est de ${IMC}. <br>
    Statut : ${answ}.`;
});

//ex2
const inputBirthday = document.getElementById("birthday");
const button3 = document.getElementById("btn3");
const ageAnsw = document.getElementById("exact-age-res");

button3.addEventListener('click', () => {
    const [bYear, bMonth, bDay] = inputBirthday.value.split('-').map(Number);
    const birthday = new Date(bYear, bMonth - 1, bDay);
    const today = new Date();

    if (!(birthday.getDate() === bDay &&
          birthday.getMonth() === bMonth - 1 &&
          birthday.getFullYear() === bYear)) {
        ageAnsw.textContent = "Date invalide.";
        return;
    }

    let year = today.getFullYear() - bYear;
    let month = today.getMonth() + 1 - bMonth;
    let day = today.getDate() - bDay;
    if (day < 0) {
    month--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    day += prevMonth.getDate();
    }

    if (month < 0) {
        year--;
        month += 12;
    }
    ageAnsw.innerHTML = `  Vous avez : <br>
    - ${year} an${year > 1 ? 's' : ''} <br>
    - ${month} mois <br>
    - ${day} jour${day > 1 ? 's' : ''}`;
});

//ex3
const inputClearanceLvl = document.getElementById("clearance-level");
const inputCurrTime = document.getElementById("time");
const inputActiveBadge = document.getElementById("active");
const button4 = document.getElementById("btn4");
const accessRes = document.getElementById("access-results");
const reason = document.getElementById("reason");

button4.addEventListener('click', () => {
    const clearLvl = inputClearanceLvl.valueAsNumber;
    const currTime = inputCurrTime.valueAsNumber;
    const activeBadge = inputActiveBadge.checked;
    if (!clearLvl || isNaN(currTime)){
        accessRes.textContent = `ACCÈS REFUSÉ`;
        reason.textContent = "Compléter tout les champs.";
        return;
    }

    if (!activeBadge) {
    accessRes.textContent = `ACCÈS REFUSÉ`;
    reason.textContent =  `Le badge n'est pas actif.`;
        return;
    }
    switch (true) {
        case clearLvl < 3:
            accessRes.textContent = `ACCÈS REFUSÉ`;
            reason.textContent = `Le niveau ${clearLvl} n'est pas suffisant pour continuer.`;
            break;
            
        case clearLvl < 5:
            if (currTime <= 20 && currTime >= 8) {
                accessRes.textContent = `ACCÈS AUTORISÉ`;
                reason.textContent = 
                `Bienvenue, niveau ${clearLvl} reconnu pendant les horaires d'ouverture.`;
            } else {
                accessRes.textContent = `ACCÈS REFUSÉ`;
                reason.textContent = 
                `Le niveau d'access ${clearLvl} n'est pas suffisant hors des horaires d'ouverture.`;
            };
            break;
        case clearLvl == 5:
            accessRes.textContent = `ACCÈS AUTORISÉ`;
            reason.textContent = `Bienvenue, niveau d'access admin reconnu.`;
            break;
    
        default:
            accessRes.textContent = `ACCÈS REFUSÉ`;
            reason.textContent = `Le niveau d'access ${clearLvl} n'est pas reconnu.`;
    }
});

//ex4
const films = ["Inception", "Interstellar", "The Dark Knight", "Parasite"];
const listeFilm = document.getElementById("listeFilm");
const inputFilm = document.getElementById("newFilm");
const btnAddFilm = document.getElementById("btnAddFilm");
const errorString = document.getElementById('error');

function afficherFilms() {
    listeFilm.innerHTML = "";
    for (const film of films) {
        const newFilm = document.createElement('li');
        newFilm.textContent = film;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "✖";
        deleteBtn.classList.add('btn', 'del');
        deleteBtn.addEventListener('click', () => {
            const indexDel = films.indexOf(film);
            films.splice(indexDel, 1);
            afficherFilms();
        });
        listeFilm.append(newFilm);
        newFilm.append(deleteBtn);
    }
    return;
}
afficherFilms();
btnAddFilm.addEventListener('click', () => {
    errorString.textContent = "";
    const film = inputFilm.value;
    if (film){
        films.push(film);
        afficherFilms();
        inputFilm.value = "";
        inputFilm.focus();
    }else{
        errorString.textContent = "Erreur, l'input ne peut pas être vide!";
        return;
    }
});