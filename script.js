const recupererPokedex = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokedex/2`);
  const pokedex = await response.json();

  return pokedex;
};

const detailsPokemon = async (number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  const details = await response.json();

  return details;
};



// On crée tous les éléments du DOM
// avec leurs classes

const section = document.getElementById("infos");
const container = document.createElement("div");
const img = document.createElement('img');
container.classList.add("container");
for (let i = 0; i < 2; i++) {
  const row = document.createElement("div");
  row.classList.add(`row${i}`)
  for (let i = 0; i < 3; i++) {
    const column = document.createElement("div");
    column.classList.add("four", "columns", `col${i}`)
    row.classList.add("row");
    row.appendChild(column);
    container.appendChild(row);
  }
}
section.appendChild(img)
section.appendChild(container);

// Selectionne l'input
const search = document.getElementById("search");

const trouverPoke = function (string) {
  // Transforme la recherche en regex et recherche le pokemon avec
  let pokeReg = new RegExp(string);
  creerPokedex(pokeReg);
};

// Event listener quand la personne valide sa recherche
search.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    trouverPoke(search.value);
    search.value = "";
  }
});

const creerPokedex = async (regex) => {
  // On vérifie que le regex match
  // Et on lance collectDetails avec le bon pokemon (perseint et +1 pour gérer conflits d'index)
  const pokedex = await recupererPokedex();
  Object.keys(pokedex.pokemon_entries).forEach((index) => {
    let temp = pokedex.pokemon_entries[index].pokemon_species.name;
    if (temp.match(regex)) {
      collectDetails(parseInt(index) + 1);
    } else return "error";
  });
};

const collectDetails = async (number) => {
  const details = await detailsPokemon(number);
  console.log(details);
  const infos = document.querySelector('.row').children;
  const pokeName = document.querySelector(".row0>.col0");
  const abilities = document.querySelector(".row0>.col1");
  const type = document.querySelector(".row0>.col2");
  const info4 = document.querySelector(".row1>.col0");
  const info5 = document.querySelector(".row1>.col1");
  const info6 = document.querySelector(".row1>.col2");
  const selImg = document.querySelector('img');
  infos.textContent = "";
  selImg.setAttribute('src', 
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`);
  pokeName.textContent = details.name
  Object.keys(details.abilities).forEach((index) => {
    abilities.textContent += details.abilities[index].ability.name + ' ';
  });
  Object.keys(details.types).forEach((index) => {
    type.textContent += details.types[index].type.name + ' ';
  });
};