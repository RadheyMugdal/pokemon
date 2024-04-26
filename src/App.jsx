import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {    
    if (!searchInput) return; 
    const timeoutId = setTimeout(() => {
      console.log("search input", searchInput);
    }, 500);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
      .then((res) => {
        setPokemonData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        setError(error);
      });

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  return (
    <main className='bg-zinc-700 text-white w-screen h-screen'>
      <h1 className='text-center text-3xl font-extrabold p-4'>Search and get details of your favorite Pokémon</h1>
      <div className='flex flex-col items-center m-3'>
        <input type="search" placeholder='Enter your Pokemon name' className='p-2 rounded-lg mx-auto w-[40vw] focus:outline-none text-black' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </div>
      <div className=''>
        
        {pokemonData && (
          <div className='mx-auto w-fit flex flex-col items-center justify-center'>
            <div className='flex flex-col  items-center justify-center bg-purple-400 p-6 rounded-lg'>
              <div className='mx-auto w-fit'>
                <img src={pokemonData.sprites.front_default} alt="pokemon-image" className='w-52 border-1 border-black mx-auto' />
                <div>
                  <p className='font-semibold text-lg'>{`Base experience: ${pokemonData.base_experience}`}</p>
                  <p className='font-semibold text-lg'>{`Name: ${pokemonData.forms[0].name}`}</p>
                  <p className='font-semibold text-lg inline'>{`Encounter Location: `}</p>
                  <span className='text-center font-semibold text-lg text-blue-600'>{`${pokemonData.location_area_encounters}`}</span>
                  <p className='font-semibold text-lg'>{`Height: ${pokemonData.height}`}</p>
                  <p className='font-semibold text-lg'>{`Weight: ${pokemonData.weight}`}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {!pokemonData && searchInput && (
          <div className='mx-auto w-fit'>
            <h1 className='p-6 text-3xl font-bold'>Cannot find Pokemon with the given name</h1>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
