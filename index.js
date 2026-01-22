const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
let countriesData = [];
let sortMethod = "maxToMin";

// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
async function fetchCountries() {
  await fetch("https://www.apicountries.com/countries")
    .then((res) => res.json())
    .then((data) => (countriesData = data));
  console.log(countriesData);
  countriesDisplay();
}

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
// 3 - Passer les données à une variable (pour ce faire créer la variable)
// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP
function countriesDisplay() {
  countriesContainer.innerHTML = countriesData
    .filter((country) =>
      country.translations.fr
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fr.localeCompare(b.translations.fr);
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) => `
        <div class="card">
            <img src=${country.flags.svg} alt="drapeau ${country.translations.fr}">
            <h2>${country.translations.fr}</h2>
            <h4>${country.capital}</h4>
            <p>Population ${country.population.toLocaleString()} hbts</p>
        </div>
    `,
    )
    .join("");
}
window.addEventListener("load", fetchCountries);

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données

// Pour exécuter le filtre
inputSearch.addEventListener("input", countriesDisplay);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
