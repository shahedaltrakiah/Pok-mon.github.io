async function fetchPokemonData() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=50';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const pokemonList = data.results;

        for (const pokemon of pokemonList) {
            const pokemonData = await fetch(pokemon.url);
            const pokemonDetails = await pokemonData.json();

            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');

            const pokemonImg = document.createElement('img');
            pokemonImg.src = pokemonDetails.sprites.front_default;
            pokemonCard.appendChild(pokemonImg);

            const pokemonNumber = document.createElement('div');
            pokemonNumber.classList.add('pokemon-number');
            pokemonNumber.textContent = `#${String(pokemonDetails.id)}`;
            pokemonCard.appendChild(pokemonNumber);

            const pokemonName = document.createElement('a');
            pokemonName.classList.add('pokemon-name');
            pokemonName.textContent = pokemonDetails.name;
            pokemonName.href = `/pages/pokemon-details.html?name=${pokemonDetails.name}`;
            pokemonCard.appendChild(pokemonName);

            document.getElementById('pokemonGrid').appendChild(pokemonCard);
        }
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

window.onload = fetchPokemonData;
