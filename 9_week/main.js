
let pokemons = [];

const fetchData = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
      .then((response) => response.json())
      .then((json) => {

        //Mapping each element and data
    const fetchData = json.results.map((item) => {
      return fetch(item.url).then((res)=> res.json());
    });

    Promise.all(fetchData).then((data) => {
      pokemons = data;
      displayData(pokemons);
      console.log(pokemons);
    });
  })

.catch((error) => console.error('Error fetching data:',error));
};
  fetchData();

  const displayData = (data) => {
    const container = document.querySelector('.data');
    container.innerHTML = '';

    data.forEach((pokemon) => {
      const pokemonCard = document.createElement('div');
      const imageUrl =
        pokemon.sprites.other.dream_world.front_default ??
        pokemon.sprites.other['official-artwork'].front_default ??
        'assets/placeholder-image-url.webp';

      const isFavorite = localStorage.getItem(pokemon.name) === 'true';
      const favoriteText = isFavorite ? 'Unmark favorite' : 'Mark favorite';

      pokemonCard.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${imageUrl}"/>
        <div class="card">
          <p>Weight: ${pokemon.weight /10} kg</p>
          <p>Height: ${pokemon.height /10} m</p>
        </div>
        <button class="favButton" data-name="${pokemon.name}">${favoriteText}</button>
      `;

      container.appendChild(pokemonCard);
    });
    addFavorites();
  };


const toggleFavorite = (e) => {
  const pokemonName = e.target.getAttribute('data-name');
  const isFavorite = localStorage.getItem(pokemonName) === 'true';
  localStorage.setItem(pokemonName, (!isFavorite).toString());

  // Update the button text immediately
  e.target.textContent = isFavorite ? 'Mark favorite' : 'Unmark favorite';
};

// const toggleFavorite = (e) => {
// const pokemonName = e.target.getAttribute('data-name');
// const isFavorite = localStorage.getItem(pokemonName) === 'true';
// localStorage.setItem(pokemonName,!isFavorite);
//       displayData(pokemons);

// };

const addFavorites = () => {
  document.querySelectorAll('.favButton')
  .forEach(button => button.addEventListener('click',toggleFavorite));
};

const debounce = (func, delay) => {
  let debounceTimer;

return function() {
  const context = this;
  const args = arguments;
  clearTimeout(debounceTimer);
debounceTimer = setTimeout(() => func.apply(context,args), delay);
};


};
const searchPokemons = debounce((searchInput) => {
  const filteredData = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  displayData(filteredData);
}, 300);


document.querySelector('#search').addEventListener('input', (e) => {
  searchPokemons(e.target.value);
});

 // Show only the favorite pokemons
const showFavorites = () => {
  const favoritePokemons = pokemons.filter(
    (pokemon) => localStorage.getItem(pokemon.name) === "true"
  );
  displayData(favoritePokemons);
};

// Add an event listener to the "Show Favorites" button
document.querySelector("#show").addEventListener("click", showFavorites);